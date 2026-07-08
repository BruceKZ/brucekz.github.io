# Multi device single monitor

## Scenario

A windows pc: (`dp` / `hdmi`) via GPU

A MacBook pro: `dp` via dock / `hdmi` via built-in socket

The monitor: AOC U27G4R (supports DDC/CI)

## Method

Since the monitor supports DDC/CI, then we can use some software to switch the input source instead of using the button on the monitor which is hard to use.

### For Windows:
Download the software [Twinkle Tray](https://twinkletray.com/).

### For MacOS:
Download the `m1ddc` from homebrew
```bash
brew install m1ddc
```

Then, list all your monitors
```bash
m1ddc display list
```

Then switch your monitor's input source

```bash
m1ddc display <UUID> set input 17
```

A shortcut script:
```bash
# ~/.zsh_monitor

DDC_MONITOR="U27G4R"

_ddc_uuid() {
  m1ddc display list | grep "$DDC_MONITOR" | sed -E 's/.*\(([^)]+)\).*/\1/'
}

ddc-input() {

  local uuid

  uuid=$(_ddc_uuid)

  if [[ -z "$uuid" ]]; then

    echo "Did not find $DDC_MONITOR,run `m1ddc display list` first." >&2

    return 1

  fi

  m1ddc display "$uuid" set input "$1"

}


hdmi1() { ddc-input 17; }

hdmi2() { ddc-input 18; }

dp() { ddc-input 15; }

win() { ddc-input 17; } 

mac() { ddc-input 15; } 
```

And don't forget to introduce this file to your `~/.zshrc`: add this to the end of `.zshrc`.
```bash
[ -f ~/.zsh_monitor ] && source ~/.zsh_monitor
```

Then

```bash
source ~/.zshrc
```