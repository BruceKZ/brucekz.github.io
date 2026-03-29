# ICPC 本地 C++ 调试的轻量工作流

很难想都 2026 年了还在古法编程，很难想都 2026 年了还有比赛不让用 CLion。

VS Code 凑合用用吧，下面的 bash 放在 `~/.bashrc` 里会很好用。

```bash
sol() {
    local dir="$1"
    mkdir -p "$dir" || return 1
    cp "main.cpp" "$dir/main.cpp"
    touch "$dir/1.in" "$dir/1.ans"
    echo "Created: $dir"
}

test() {
    local dir="$1"
    local oldpwd="$PWD"
    cd $dir
    g++ main.cpp -std=c++17 -O2 -o .test_main
    echo "---[Build finished]---"
    for infile in $(ls -v *.in); do
        a="${infile%.in}"
        echo "Testing [${a}]"
        ./.test_main < "${a}.in" > "${a}.out"
        if diff -Z -B "${a}.out" "${a}.ans" > /dev/null; then
            echo "[${a}]: Accepted"
        else
            echo "[${a}]: Wrong Answer"
            diff -Z -B "${a}.out" "${a}.ans"
        fi
    done
    rm -f .test_main
    cd "$oldpwd"
}
```

## Usage

先创建比赛文件夹，在里面创建一个 `main.cpp` 作为代码模板。

`sol a` 会创建目录 `a`，复制一份 `main.cpp`，并生成 `1.in` 和 `1.ans`。

`test a` 会找这个目录，然后把所有测试都测一遍，忽略行尾空格和换行。

多测试的时候，直接在 Domjudge 上面把数据包下载到对应题目文件夹然后解压就行了。

或许应该再补一个 `run a` 但是这次比较紧迫所以没写，以后还有机会接触算法竞赛吗？ Who knows.