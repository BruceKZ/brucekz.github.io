# EPFL Izar GPU Cluster Usage Guide

**Important:** Do not run resource-intensive programs on the login node (`izar1`). All computational tasks must be submitted to compute nodes.

---

## 1. Login

**Prerequisites:** Connection to EPFL network (Eduroam) or VPN.

```bash
# Login via SSH
ssh <username>@izar.hpc.epfl.ch

# Logout
exit
# Or use Ctrl + D
```

---

## 2. Directory & File Management (Home vs Scratch)

*   **`~` (Home Directory)**: Small capacity (~50GB). Use for code files (`.py`, `.sh`) and configuration files only. **Do not store datasets or model weights here.**
*   **`/scratch` (High Performance Scratch)**: Large capacity, high I/O speed. Use for datasets, virtual environments (Conda envs), and model checkpoints. Note that this directory is cleared at the end of the semester; ensure you back up important data.

```bash
# Navigate to your scratch directory
cd /scratch/$USER

# Check current directory path
pwd

# List files
ls -lh
```

---

## 3. Software & Environment Management (Module System)

Software on the cluster (e.g., Python, CUDA, GCC) is loaded on demand via the module system.

```bash
# List all available modules
module avail

# Search for a specific module (e.g., cuda)
module spider cuda

# Load required modules (e.g., gcc and python)
module load gcc python

# List currently loaded modules
module list

# Unload all modules (recommended at start of scripts)
module purge
```

---

## 4. Job Management & GPU Allocation (Slurm)

Resource allocation is managed by the Slurm workload manager.

### Interactive Allocation (For Debugging)

Request a compute node for interactive use.

```bash
# Request 1 GPU for 30 minutes with an interactive bash shell
srun --pty --partition=gpu --gres=gpu:1 --time=00:30:00 bash

# Parameters:
# --pty: Allocate a pseudo-terminal
# --partition=gpu: Use the GPU queue
# --gres=gpu:1: Request 1 GPU
# --time=00:30:00: Duration (HH:MM:SS)
```

*Note: Upon successful allocation, the prompt changes from `[username@izar1 ~]` to `[username@iXXXX ~]`. Type `exit` to release resources when finished.*

### Job Monitoring & Management

```bash
# View your current jobs (RUNNING or PENDING)
squeue -u $USER

# Cancel a specific job
scancel <JOBID>
# Example: scancel 1234567

# Check GPU node status
sinfo -p gpu
```
