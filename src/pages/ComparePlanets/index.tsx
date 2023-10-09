import { useContext } from 'react'
import { Planet } from '../../components/Planet'
import styles from './styles.module.scss'
import { AppContext } from '../../context/AppContext'

export function ComparePlanets() {
  const { planetInfo, planetInfoAttr, texture, planetName } =
    useContext(AppContext)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/logo.png" alt="Planet Factory" />
      </div>

      <div className={styles.content}>
        <div className={styles.fieldPlanetItem}>
          <Planet size={200} texture={'/textures/' + texture} name="planet-1" />

          <div className={styles.fieldPlanetItemContent}>
            <h3>{planetName}</h3>

            <div className={styles.fieldInformations}>
              <div className={styles.leftInformations}>
                {planetInfo.map((info, index) => (
                  <div key={index} className={styles.descItem}>
                    <strong>{info.label}</strong>
                    <p>{info.value}</p>
                  </div>
                ))}
              </div>

              <div className={styles.divider} />

              <div className={styles.rightInformations}>
                {planetInfoAttr.map((info, index) => (
                  <div key={index} className={styles.descItem}>
                    <strong>{info.label}</strong>
                    <p>{info.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.fieldPlanetItem}>
          <Planet size={200} texture="/earth_hd.jpg" name="planet-2" />

          <div className={styles.fieldPlanetItemContent}>
            <h3>Earth</h3>

            <div className={styles.fieldInformations}>
              <div className={styles.leftInformations}>
                <div className={styles.descItem}>
                  <strong>Water</strong>
                  <p>70%</p>
                </div>

                <div className={styles.descItem}>
                  <strong>Temperature</strong>
                  <p>17.8 °C</p>
                </div>

                <div className={styles.descItem}>
                  <strong>Nature</strong>
                  <p>50%</p>
                </div>

                <div className={styles.descItem}>
                  <strong>Surface</strong>
                  <p>50%</p>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.rightInformations}>
                <div className={styles.descItem}>
                  <strong>Radius</strong>
                  <p>6.371 km</p>
                </div>

                <div className={styles.descItem}>
                  <strong>Mass</strong>
                  <p>5.974 10^24 kgC</p>
                </div>

                <div className={styles.descItem}>
                  <strong>Density</strong>
                  <p>5.5 g/cm^3</p>
                </div>

                <div className={styles.descItem}>
                  <strong>Orbital Period</strong>
                  <p>365 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
