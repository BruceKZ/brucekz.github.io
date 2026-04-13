# macOS 环境下的轻量级 LaTeX 工作流

基于 Docker 与 VS Code 的容器化编译方案

在 macOS 系统中进行 LaTeX 文档排版时，传统的 MacTeX 本地安装方式通常会占用大量磁盘空间（通常达数 GB 至十几 GB），且由于文件分散于系统各处，后续的维护与卸载过程较为繁琐。为保持宿主机环境的纯净与整洁，本文介绍一种基于容器化技术（Docker）的替代方案。通过结合 VS Code 与自定义 Zsh 脚本，可以构建一套高度自动化、无侵入式的 LaTeX 编译工作流。

---

## 1. 卸载现有 MacTeX 环境（可选）

若系统中已安装 MacTeX 官方包，建议在配置 Docker 方案前将其完全卸载，以释放存储空间。请在终端（Terminal）中依次执行以下命令（需要管理员权限）：

```bash
# 1. 删除核心引擎（释放主要存储空间）
sudo rm -rf /usr/local/texlive

# 2. 删除随附的 GUI 应用程序（如 TeXShop 等）
sudo rm -rf /Applications/TeX

# 3. 删除相关的系统快捷方式与符号链接
sudo rm -rf /Library/TeX

# 4. 删除环境变量配置文件
sudo rm /etc/paths.d/TeX
sudo rm /etc/manpaths.d/TeX
```

执行完毕后，本地相关的 TeX 系统文件将被彻底清除。

---

## 2. VS Code 与 Docker 的集成配置

本方案旨在实现无需离开编辑器的自动化编译体验：在保存 `.tex` 源文件时，VS Code 将自动调用后台 Docker 容器进行编译，并保留 SyncTeX 的正反向跳转功能。

**环境要求：**

1. 宿主机已安装并运行 **Docker Desktop**。
2. VS Code 已安装 **LaTeX Workshop** 扩展。

在项目根目录下创建 `.vscode` 目录，并在其中新建 `settings.json` 文件，写入以下配置项：

```json
{
  "latex-workshop.latex.tools": [
    {
      "name": "latexmk (docker)",
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-v",
        "%DIR%:%DIR%",
        "-w",
        "%DIR%",
        "texlive/texlive",
        "latexmk",
        "-xelatex",
        "-shell-escape",
        "-synctex=1",
        "-interaction=nonstopmode",
        "-file-line-error",
        "-outdir=%OUTDIR%",
        "%DOCFILE%"
      ]
    }
  ],
  "latex-workshop.latex.recipes": [
    {
      "name": "Docker: XeLaTeX",
      "tools": [
        "latexmk (docker)"
      ]
    }
  ],
  "latex-workshop.latex.recipe.default": "lastUsed"
}
```

**配置解析：**

* `--rm`：确保编译完成后立即销毁临时容器，避免占用系统资源。
* `-v "%DIR%:%DIR%"`：实现宿主机与容器之间的目录映射，确保输出的 PDF 文件具有一致的绝对路径，从而兼容 SyncTeX 跳转功能。
* 首次触发编译时，Docker 将自动拉取 `texlive/texlive` 官方完整镜像。此过程耗时取决于网络环境，后续编译将实现毫秒级容器启动。

---

## 3. 命令行工具链：基于 Zsh 的模块化脚本

为进一步提升效率，可通过编写自定义 Zsh 函数，实现项目初始化、命令行独立编译以及辅助文件清理的自动化。为保持 `.zshrc` 主配置文件的整洁，推荐采用模块化加载方式，将 LaTeX 相关脚本独立存放在 `~/.zsh_latex` 文件中。

### 准备工作：先准备本地模板目录

在使用自动化脚本配置初始化命令前，请先准备好本地模板目录。

参考：[EPFL LaTeX 作业模板](./epfl_homework_template.md)。

### 创建核心脚本

在终端执行以下命令，生成并写入配置文件：

```bash
cat << 'EOF' > ~/.zsh_latex
# ==========================================
# LaTeX Docker Workflow Configuration
# ==========================================

# 1. 从模板初始化作业环境并启动编辑器
epfl_hw() {
    # 替换为本地模板的绝对路径
    local template_dir="$HOME/Projects/EPFL_Homework_Template"
    local target_name="${1:-EPFL_Homework_Template}"

    if [ ! -d "$template_dir" ]; then
        echo "Error: Template directory not found at $template_dir"
        return 1
    fi

    if [ -e "$target_name" ]; then
        echo "Error: Target '$target_name' already exists in the current directory."
        return 1
    fi

    cp -r "$template_dir" "./$target_name"
    echo "Created: ./$target_name"
    
    cd "./$target_name" || return
    code .
}

# 2. 调用 Docker 执行命令行编译
texbuild() {
    local target_file="${1:-main.tex}"

    if [ ! -f "$target_file" ]; then
        echo "Error: Source file '$target_file' not found."
        return 1
    fi

    echo "Building $target_file via Docker..."
    
    docker run --rm \
        -v "$PWD":"$PWD" \
        -w "$PWD" \
        texlive/texlive \
        latexmk -xelatex -shell-escape -synctex=1 -interaction=nonstopmode -file-line-error "$target_file"
        
    echo "Build completed."
}

# 3. 清理编译产生的辅助文件
texclean() {
    setopt localoptions nonomatch
    
    local junk_files=(
        *.aux *.log *.out *.fls *.fdb_latexmk *.synctex.gz 
        *.toc *.bbl *.blg *.xdv *.nav *.snm *.vrb *.lof *.lot
    )
    
    rm -f $junk_files 2>/dev/null
    
    echo "Cleaned auxiliary files."
}
EOF
```

### 环境变量配置

编辑 `~/.zshrc` 文件，在末尾追加以下代码以加载该模块：

```bash
# 加载自定义的 LaTeX Docker 工作流配置
[ -f ~/.zsh_latex ] && source ~/.zsh_latex
```

保存后，在终端执行 `source ~/.zshrc` 使环境变量生效。

---

## 4. 工作流应用演示

完成上述配置后，日常文稿排版流程将大幅简化：

1. **项目初始化：** 在终端执行 `epfl_hw homework1`。系统将自动复制预设模板至当前目录，重命名为 `homework1`，并使用 VS Code 打开该项目。
2. **文档编译：** 在 VS Code 中编辑文档并保存，系统将自动触发后台 Docker 容器完成编译。若需脱离 GUI 环境，也可直接在项目目录下执行 `texbuild` 命令进行独立编译。
3. **环境清理：** 编译完成后，若需移除冗余的临时中间文件（如 `.aux`、`.log` 等），仅需执行 `texclean`，目录中将仅保留源文件与生成的 PDF 最终文件。

该方案通过容器化技术剥离了复杂的本地依赖，结合自动化脚本，提供了一个高效、可靠且易于迁移的 LaTeX 编译环境。相关模板与配置文件可托管至 GitHub 等版本控制平台，便于跨设备快速部署与恢复环境。