// 'use client';

import styles from "@/styles/notFound.module.scss";

export default function Custom404() {
  return (
    <>
      <div className={styles.morty}>
        <div className={styles.hair}></div>
        <div className={styles.ears}></div>
        <div className={styles.face}></div>
        <div className={styles.eyes}></div>
        <div className={styles.nose}></div>
        <div className={styles.mouth}></div>
        <div className={styles.lines}></div>
      </div>
      <div className={styles.text}>ERROR 404</div>
    </>
  );
}
