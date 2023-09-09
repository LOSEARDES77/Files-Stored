import React from 'react'
import styles from './Progress.module.scss'

export default function Progress({ progress }: Progress) {
    return (
        <progress className={`progress progress-info w-56 ${styles.progress}`} value={progress} max="100">{progress}%</progress>
    );
}
