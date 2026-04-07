# JS Stopwatch

A clean, functional stopwatch built with vanilla JavaScript, focused on DOM manipulation, interval-based timing, and dynamic list rendering.

---

## 🚀 Live Preview

👉 [View Live](https://mabbasdev.github.io/js-stopwatch/)

---

## 📸 Preview

> ([View Live](https://mabbasdev.github.io/js-stopwatch/))

---

## 🧠 Project Overview

A browser-based stopwatch that lets users start, pause, reset, and record lap times. It is built as part of a structured JavaScript learning series, with the goal of applying core concepts (intervals, DOM updates, array methods) in a real, interactive UI rather than isolated exercises.
Real-world relevance: timing tools are used in fitness apps, productivity trackers, exam timers, and workout loggers this covers the logic behind all of them.

---

## ⚙️ Features

- **Start / Pause**: controls the interval without losing elapsed count
- **Reset**: stops the timer and returns display to zero
- **Lap Recording**: captures the current timer value and appends it to a live-rendered list
- **Duplicate Lap Prevention**: avoids recording the same second twice using `Array.includes()`
- **Clear Laps**: wipes the lap array and re-renders an empty state
- **Lap Counter Badge**: live badge showing how many laps have been recorded
- **Entrance Animation**: newest lap item gets a `fadeSlide` CSS animation on append
- **Responsive UI**: works on mobile and desktop

---

## 🧩 Concepts Used

| Concept | Where It's Used |
|---|---|
| `setInterval` / `clearInterval` | Core timer start and stop logic |
| DOM Selection (`getElementById`) | Binding all UI elements at the top of the script |
| `innerHTML` | Updating the timer display and lap badge |
| `createElement` / `classList` / `append` | Dynamically building each lap list item |
| Arrays (`push`, `includes`, `indexOf`, `forEach`) | Storing, deduplicating, and rendering lap times |
| Arrow Functions | All core functions use `const fn = () => {}` syntax |
| Event Listeners | Wired to all five buttons |

---

## 💡 Key Learning

The biggest realization while building this: `setInterval` does not guarantee exact timing.

It fires *approximately* every 1000ms and that gap compounds. Over a long session, the displayed time drifts from actual elapsed time. This is a known limitation of interval-based timers and the reason production stopwatches use `performance.now()` with `requestAnimationFrame` instead.

That distinction between "close enough" and "precise", matters a lot when you're dealing with time-sensitive UIs. I explored the `performance.now()` approach in a separate commented-out implementation inside `index.html`.

It's also worth noting re-rendering the full lap list on every `saveLap()` call is fine for small datasets but doesn't scale. An incremental DOM update (append only the new item) would be more efficient.

---

## ⚠️ Challenges Faced

**1. Duplicate lap entries**
When the timer sits on the same second, clicking Lap twice would record the same value. Fixed by checking `lapArr.includes(lapTime)` before pushing, though this means you can't intentionally record the same time twice, which is a trade-off worth revisiting.

**2. Lap counter off-by-one**
`lapCount` initializes at `1` and the badge captures `numLap = lapCount++` (pre-increment). After a few laps, the displayed count runs one ahead. Caught during testing started at `0` is the correct baseline.

**3. Full list re-render on each lap**
`showLaps()` clears and rebuilds the entire `<ul>` on every call. Functional, but not optimal. Incremental appending would avoid unnecessary DOM work.

**4. `setInterval` drift**
For long sessions, the second count drifts from real elapsed time. The fix `performance.now()` + `requestAnimationFrame` is explored in the commented code but not shipped in the current version.

---

## 🔧 How It Works

1. **Start** — `timerCount` increments immediately, then `setInterval` fires every 1000ms to keep updating `innerHTML`
2. **Pause** — `clearInterval(intervalTimer)` stops the interval; `timerCount` holds its current value
3. **Resume** — calling `startTimer()` again creates a new interval from the current `timerCount`
4. **Lap** — captures `timerElement.innerHTML` as a string, checks for duplicates, pushes to `lapArr`, then calls `showLaps()` to rebuild the list
5. **Clear** — empties `lapArr`, resets `lapCount`, rebuilds the list with the empty state message
6. **Render** — `showLaps(data)` loops through the array with `forEach`, creates `<li>` elements, and appends them; the last child gets the `lap-new-item` animation class

---

## 📁 Project Structure

```
js-stopwatch/
├── index.html      # Markup: timer display, control buttons, lap panel
├── style.css       # Styling: layout, button variants, animations, responsive
└── script.js       # Logic: timer control, lap management, DOM rendering
```

---

## 🛠️ Future Improvements

- **Switch to `performance.now()` + `requestAnimationFrame`** accurate sub-second timing, no drift
- **Show centiseconds** display `HH:MM:SS.cs` instead of raw second count
- **Fastest / slowest lap highlight**: compare lap times and mark best/worst
- **LocalStorage persistence** preserve lap history on page refresh
- **Keyboard shortcuts** Space to start/pause, `L` for lap, `R` for reset (UX improvement with zero extra UI)

---

## 🔗 Repository

[github.com/mabbasdev/js-stopwatch](https://github.com/mabbasdev/js-stopwatch)

---

## 📌 Connect

> [LinkedIn: Muhammad Abbas](https://www.linkedin.com/in/mabbasdev/)

---

## ⭐ Support

If this project helped you understand interval-based timers or DOM rendering patterns, a star on the repo would be appreciated.
