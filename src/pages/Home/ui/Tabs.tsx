import { useState } from "react";
import TabButton from "./TabButton";
import BibleView from "./BibleView";

import styles from "./tabs.module.css"

export default function Tabs() {
  const [currentTab, setCurrentTab] = useState("Bible");

  const handleTabClick = (text: string) => {
    setCurrentTab(text)
  }

  const TABS = [
    { text: "Bible", element: <BibleView /> },
    { text: "Songs", element: null },
    { text: "Background", element: null },
  ]

  return (
    <div className={styles.body}>
      <div className={styles.controls}>
        {TABS.map((tab, index) => <TabButton key={index} onClick={() => handleTabClick(tab.text)} isActive={tab.text == currentTab} >{tab.text}</TabButton>)}
      </div>
      <div className={styles.content}>
        {TABS.find(tabs => tabs.text == currentTab)?.element}
      </div>
    </div>
  )
}
