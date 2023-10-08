import { Planet } from '../../components/Planet'
import styles from './styles.module.scss'

export function ComparePlanets() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/logo.png" alt="Planet Factory" />
      </div>

      <div className={styles.content}>
        <div className={styles.fieldPlanetItem}>
          <Planet size={200} texture="/textura.png" name="planet-1" />

          <div className={styles.fieldPlanetItemContent}></div>
        </div>

        <div className={styles.fieldPlanetItem}>
          <Planet size={200} texture="/textura2.png" name="planet-2" />

          <div className={styles.fieldPlanetItemContent}></div>
        </div>

        <div className={styles.fieldPlanetItem}>
          <Planet size={200} texture="/textura3.png" name="planet-3" />

          <div className={styles.fieldPlanetItemContent}></div>
        </div>
      </div>
    </div>
  )
}
