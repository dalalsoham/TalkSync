"use client";
import classes from './page.module.css';

export default function Page() {
  return (
    <div>
      <div>
        <h1>Al Messages will appear here</h1>
      </div>
      <div>
        <input className={classes["chat-input"]} placeholder="Message..." />
        <button className={classes["button"]}>Send</button>
      </div>
    </div>
  )
}