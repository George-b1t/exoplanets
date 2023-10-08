import { useState } from 'react'
import styles from './styles.module.scss'
import { Planet } from '../../components/Planet'
import { Slider } from '@mui/material'

interface Option {
  name: string
  icon: string
  description: string
}

export function MakePlanet() {
  const [currentSelection, setCurrentSelection] = useState('Water')

  const options: Option[] = [
    {
      name: 'Water',
      icon: '/icons/water.png',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!\n\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    },
    {
      name: 'Temperature',
      icon: '/icons/temperature.png',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!\n\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    },
    {
      name: 'Nature',
      icon: '/icons/nature.png',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!\n\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    },
    {
      name: 'Surface',
      icon: '/icons/surface.png',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!\n\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    },
    {
      name: 'Attributes',
      icon: '/icons/attributes.png',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!\n\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias obcaecati fugiat voluptatibus commodi aliquid aperiam reprehenderit minus alias accusamus voluptates corporis non, dolores, vel, dolor et? Amet dicta quas architecto!Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    },
  ]

  function getCurrentOption(): Option {
    const findedOption = options.find(
      (option) => option.name === currentSelection,
    )

    if (!findedOption) {
      return options[0]
    }

    return findedOption
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/logo.png" alt="Planet Factory" />
      </div>

      <div className={styles.content}>
        <h1 className={styles.contentTitle}>Make your own planet</h1>

        <div className={styles.mainContent}>
          <div className={styles.chooseContainer}>
            <div className={styles.chooseOptionsContainer}>
              <div className={styles.options}>
                {options.map((option) => (
                  <button
                    key={option.name}
                    className={
                      currentSelection === option.name ? styles.active : ''
                    }
                    onClick={() => setCurrentSelection(option.name)}
                  >
                    <img src={option.icon} alt={option.name} />
                    <span>{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.optionProperties}>
              <div className={styles.optionPropertiesHeader}>
                <img
                  src={getCurrentOption().icon}
                  alt={getCurrentOption().name}
                />
                <h2>{getCurrentOption().name}</h2>
              </div>

              <p>{getCurrentOption().description}</p>

              <div className={styles.sliderField}>
                <p>Less</p>
                <Slider />
                <p>More</p>
              </div>
            </div>
          </div>

          <div className={styles.planetField}>
            <Planet size={360} texture="/textura.png" name="main-planet" />

            <button>Generate</button>
          </div>
        </div>
      </div>
    </div>
  )
}
