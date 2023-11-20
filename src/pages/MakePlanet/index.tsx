import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Planet } from '../../components/Planet'
import { Slider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { Loading } from '../../components/Loading'
import { toast } from 'react-toastify'
import { translate } from '../../services/translate'

import { Configuration, OpenAIApi } from 'openai'

interface Option {
  name: string
  icon: string
  description: string
  slider: number
  max: number
  min: number
  metric_unit: string
  mark: {
    value: number
    label: string
  }
}

interface Attribute {
  name: string
  slider: number
  max: number
  min: number
  showMaxMin: (value: number) => string
  metric_unit: string
  mark: {
    value: number
    label: string
  }
}

export function MakePlanet() {
  const {
    planetName,
    setPlanetName,
    setPlanetDescription,
    setTexture,
    idioma,
    setIdioma,
    translatedTexts,
    setTranslatedTexts,
  } = useContext(AppContext)

  const [isLoading, setIsLoading] = useState(false)
  const [loadingLabel, setLoadingLabel] = useState('Loading')

  const [currentSelection, setCurrentSelection] = useState('Water')

  const [isNaming, setIsNaming] = useState(false)

  const navigate = useNavigate()

  function showMaxMinF(value: number) {
    return (value / 10).toString() + 'x'
  }

  async function handleChangeLanguage() {
    if (idioma === 'en') {
      setLoadingLabel('Translating texts')
      setIsLoading(true)

      await translate({
        texts: [
          'Water',
          "Water is fundamental for a habitable planet. It sustains life, being a universal solvent crucial for biological processes. Its high heat capacity helps regulate temperatures, preventing extreme fluctuations that would otherwise render a planet uninhabitable. Water provides hydration for all organisms, a basic necessity for survival.\n\nMoreover, water bodies like oceans and lakes support diverse ecosystems, offering sustenance and oxygen for countless species. Water's role in climate regulation, through processes like evaporation and precipitation, maintains a stable environment.",
          'Earth · 70%',
          'Temperature',
          "Temperature is a crucial factor for a planet's habitability. It determines the presence of liquid water, essential for life as we know it.\n\nA stable temperature range supports diverse ecosystems and prevents extreme fluctuations that can disrupt life. This concept is central to the search for habitable exoplanets, as astronomers seek regions with the right temperature conditions around distant stars.",
          'Earth · 17.18 °C',
          'Nature',
          "Nature plays a pivotal role in determining a planet's habitability. It influences climate, weather patterns, and geological features, impacting temperature, landforms, and available resources. Biodiversity and ecosystems provide essential services like pollination and water purification, sustaining life.\n\nFurthermore, natural resources such as clean air, freshwater, and fertile soil are vital for both human and ecological well-being. Understanding and preserving the delicate balance of nature is critical for maintaining a habitable environment.",
          'Earth · 50%',
          'Surface',
          'The terrain surface is a pivotal factor in habitability, influencing climate, water availability, and natural hazards. Landforms shape temperature variations, affecting regional climates. Water bodies and aquifers are determined by terrain, impacting the availability of freshwater, essential for life.\n\nCertain terrains can be prone to natural hazards like earthquakes or landslides, which can compromise safety and habitability. Additionally, the quality of soil, often influenced by terrain, directly affects agriculture and food production.',
          'Earth · 50%',
          'Attributes',
          'Radius',
          'Earth · 6.371 km',
          'Mass',
          'Earth · 5.974 10^24 kg',
          'Density',
          'Earth · 5.5 g/cm^3',
          'Orbital Period',
          'days',
          'Earth · 365 days',
          'Generate',
          'Name of the planet',
          'Generating planet images',
          'Generating planet description',
          '',
        ],
      }).then((response) => {
        setTranslatedTexts(response)
        setCurrentSelection('Água')
      })
      setIsLoading(false)
      setIdioma('pt')
      setCurrentSelection('Água')
    } else {
      setIdioma('en')
      setCurrentSelection('Water')
    }
  }

  const texturesList = [
    'wine-red.png',
    'water-blue.png',
    'violet.png',
    'velvet-red.png',
    'toxic-green.png',
    'snow-white.png',
    'shocking-pink.png',
    'rose-pink.png',
    'rose.png',
    'red.png',
    'pink.png',
    'moss-green.png',
    'light-red.png',
    'light-purple.png',
    'light-pink.png',
    'light-green.png',
    'light-brown.png',
    'green.png',
    'galaxy-purple.png',
    'dark-purple.png',
    'dark-pink.png',
    'dark-green.png',
    'dark-brown.png',
    'brown.png',
    'blood-red.png',
  ]

  const attributesData: Attribute[] = [
    {
      name: idioma === 'en' ? 'Radius' : translatedTexts[13],
      slider: 10,
      max: 25,
      min: 8,
      metric_unit: 'km',
      showMaxMin: showMaxMinF,
      mark: {
        label: idioma === 'en' ? 'Earth · 6.371 km' : translatedTexts[14],
        value: 10,
      },
    },
    {
      name: idioma === 'en' ? 'Mass' : translatedTexts[15],
      slider: 10,
      max: 76,
      min: 3,
      metric_unit: '10^24 kg',
      showMaxMin: showMaxMinF,
      mark: {
        label: idioma === 'en' ? 'Earth · 5.974 10^24 kg' : translatedTexts[16],
        value: 10,
      },
    },
    {
      name: idioma === 'en' ? 'Density' : translatedTexts[17],
      slider: 55,
      max: 78,
      min: 24,
      metric_unit: 'g/cm^3',
      showMaxMin: (v) => (v / 10).toString(),
      mark: {
        label: idioma === 'en' ? 'Earth · 5.5 g/cm^3' : translatedTexts[18],
        value: 55,
      },
    },
    {
      name: idioma === 'en' ? 'Orbital Period' : translatedTexts[19],
      slider: 365,
      max: 636,
      min: 4,
      metric_unit: idioma === 'en' ? 'days' : translatedTexts[20],
      showMaxMin: (v) => v.toString(),
      mark: {
        label: idioma === 'en' ? 'Earth · 365 days' : translatedTexts[21],
        value: 365,
      },
    },
  ]

  const [attributes, setAttributes] = useState(attributesData)

  const optionsData: Option[] = [
    {
      name: idioma === 'en' ? 'Water' : translatedTexts[0],
      icon: '/icons/water.png',
      description:
        idioma === 'en'
          ? "Water is fundamental for a habitable planet. It sustains life, being a universal solvent crucial for biological processes. Its high heat capacity helps regulate temperatures, preventing extreme fluctuations that would otherwise render a planet uninhabitable. Water provides hydration for all organisms, a basic necessity for survival.\n\nMoreover, water bodies like oceans and lakes support diverse ecosystems, offering sustenance and oxygen for countless species. Water's role in climate regulation, through processes like evaporation and precipitation, maintains a stable environment."
          : translatedTexts[1],
      slider: 70,
      max: 80,
      min: 30,
      metric_unit: '%',
      mark: {
        label: idioma === 'en' ? 'Earth · 70%' : translatedTexts[2],
        value: 70,
      },
    },
    {
      name: idioma === 'en' ? 'Temperature' : translatedTexts[3],
      icon: '/icons/temperature.png',
      description:
        idioma === 'en'
          ? "Temperature is a crucial factor for a planet's habitability. It determines the presence of liquid water, essential for life as we know it.\n\nA stable temperature range supports diverse ecosystems and prevents extreme fluctuations that can disrupt life. This concept is central to the search for habitable exoplanets, as astronomers seek regions with the right temperature conditions around distant stars."
          : translatedTexts[4],
      slider: 17.18,
      max: 25,
      min: 9,
      metric_unit: '°C',
      mark: {
        label: idioma === 'en' ? 'Earth · 17.18 °C' : translatedTexts[5],
        value: 17.18,
      },
    },
    {
      name: idioma === 'en' ? 'Nature' : translatedTexts[6],
      icon: '/icons/nature.png',
      description:
        idioma === 'en'
          ? "Nature plays a pivotal role in determining a planet's habitability. It influences climate, weather patterns, and geological features, impacting temperature, landforms, and available resources. Biodiversity and ecosystems provide essential services like pollination and water purification, sustaining life.\n\nFurthermore, natural resources such as clean air, freshwater, and fertile soil are vital for both human and ecological well-being. Understanding and preserving the delicate balance of nature is critical for maintaining a habitable environment."
          : translatedTexts[7],
      slider: 50,
      max: 100,
      min: 0,
      metric_unit: '%',
      mark: {
        label: idioma === 'en' ? 'Earth · 50%' : translatedTexts[8],
        value: 50,
      },
    },
    {
      name: idioma === 'en' ? 'Surface' : translatedTexts[9],
      icon: '/icons/surface.png',
      description:
        idioma === 'en'
          ? 'The terrain surface is a pivotal factor in habitability, influencing climate, water availability, and natural hazards. Landforms shape temperature variations, affecting regional climates. Water bodies and aquifers are determined by terrain, impacting the availability of freshwater, essential for life.\n\nCertain terrains can be prone to natural hazards like earthquakes or landslides, which can compromise safety and habitability. Additionally, the quality of soil, often influenced by terrain, directly affects agriculture and food production.'
          : translatedTexts[10],
      slider: 50,
      max: 100,
      min: 0,
      metric_unit: '%',
      mark: {
        label: idioma === 'en' ? 'Earth · 50%' : translatedTexts[11],
        value: 50,
      },
    },
    {
      name: idioma === 'en' ? 'Attributes' : translatedTexts[12],
      icon: '/icons/attributes.png',
      description: '',
      slider: 0,
      max: 0,
      min: 0,
      metric_unit: '',
      mark: {
        label: '',
        value: 0,
      },
    },
  ]

  const [options, setOptions] = useState<Option[]>(optionsData)

  useEffect(() => {
    setOptions(optionsData)
    setAttributes(attributesData)
    setPlanetName(idioma === 'en' ? 'Name of the planet' : translatedTexts[23])
  }, [idioma])

  async function getPlanetImages() {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const randomTexture = texturesList[Math.floor(Math.random() * 25)]

    setTexture(randomTexture)

    return true
  }

  async function sendPlanetData() {
    const water = options[0].slider / 10
    const radius = attributes[0].slider / 10
    const mass = attributes[1].slider / 10
    const density = attributes[2].slider / 10
    const nature = options[2].slider
    const surface = options[3].slider
    const orbitalPeriod = attributes[3].slider
    const temperature = options[1].slider

    const prompt =
      'Describe in a detailed form a habitable exoplanet named ' +
      planetName +
      ' where ' +
      'the exoplanet is compound of (' +
      water +
      '+%) water, the fauna and flora of this planet ' +
      'have a ' +
      nature +
      ' diversity of life and the terrain of it is predominantly ' +
      'composed of ' +
      surface +
      '. The exoplanet has an orbit ' +
      'period of ' +
      orbitalPeriod +
      ' days and has an average surface ' +
      'temperature of ' +
      temperature +
      '°C. The radius of the exoplanet is ' +
      radius +
      ' km, ' +
      'the mass of the exoplanet is ' +
      mass +
      ' 10^24 kg and the density of the exoplanet is ' +
      density +
      ' g/cm^3.' +
      '\n\n' +
      '- If you want you can use the datas of the orbit period to generate the distance of the ' +
      'exoplanet to the star of its solar system based on this formula T^2 = (4π^2 * a^3) / (G * M).' +
      '\n' +
      '- Do that description very well detailed please, giving good information about fauna and flora.' +
      '\n' +
      '- That description should be in a single text not containing unordered lists. Or any kind ' +
      'of list' +
      '\n' +
      '- Do that description in a single text summary containing 200 words' +
      '\n' +
      '- And please dont show the formula on the generated text' +
      '\n' +
      '- When you are generating the names of the fauna animals and flora plants try not to ' +
      'generate a too many fictional name'

    const configuration = new Configuration({
      apiKey: import.meta.env.VITE_GPT_KEY,
    })

    const openai = new OpenAIApi(configuration)

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 1000,
    })

    setPlanetDescription(completion.data.choices[0].message?.content || '')

    await translate({
      texts: [
        'Water',
        "Water is fundamental for a habitable planet. It sustains life, being a universal solvent crucial for biological processes. Its high heat capacity helps regulate temperatures, preventing extreme fluctuations that would otherwise render a planet uninhabitable. Water provides hydration for all organisms, a basic necessity for survival.\n\nMoreover, water bodies like oceans and lakes support diverse ecosystems, offering sustenance and oxygen for countless species. Water's role in climate regulation, through processes like evaporation and precipitation, maintains a stable environment.",
        'Earth · 70%',
        'Temperature',
        "Temperature is a crucial factor for a planet's habitability. It determines the presence of liquid water, essential for life as we know it.\n\nA stable temperature range supports diverse ecosystems and prevents extreme fluctuations that can disrupt life. This concept is central to the search for habitable exoplanets, as astronomers seek regions with the right temperature conditions around distant stars.",
        'Earth · 17.18 °C',
        'Nature',
        "Nature plays a pivotal role in determining a planet's habitability. It influences climate, weather patterns, and geological features, impacting temperature, landforms, and available resources. Biodiversity and ecosystems provide essential services like pollination and water purification, sustaining life.\n\nFurthermore, natural resources such as clean air, freshwater, and fertile soil are vital for both human and ecological well-being. Understanding and preserving the delicate balance of nature is critical for maintaining a habitable environment.",
        'Earth · 50%',
        'Surface',
        'The terrain surface is a pivotal factor in habitability, influencing climate, water availability, and natural hazards. Landforms shape temperature variations, affecting regional climates. Water bodies and aquifers are determined by terrain, impacting the availability of freshwater, essential for life.\n\nCertain terrains can be prone to natural hazards like earthquakes or landslides, which can compromise safety and habitability. Additionally, the quality of soil, often influenced by terrain, directly affects agriculture and food production.',
        'Earth · 50%',
        'Attributes',
        'Radius',
        'Earth · 6.371 km',
        'Mass',
        'Earth · 5.974 10^24 kg',
        'Density',
        'Earth · 5.5 g/cm^3',
        'Orbital Period',
        'days',
        'Earth · 365 days',
        'Generate',
        'Name of the planet',
        'Generating planet images',
        'Generating planet description',
        completion.data.choices[0].message?.content || '',
      ],
    }).then((response) => {
      setTranslatedTexts(response)
    })

    return true
  }

  function getCurrentOption(): Option {
    const findedOption = options.find(
      (option) => option.name === currentSelection,
    )

    if (!findedOption) {
      return options[0]
    }

    return findedOption
  }

  async function handleNextStep() {
    setIsLoading(true)

    setLoadingLabel(
      idioma === 'en' ? 'Generating planet images' : translatedTexts[24],
    )

    const resultImages = await getPlanetImages()

    if (!resultImages) {
      toast.info('We were unable to generate images of the planet')
    }

    setLoadingLabel(
      idioma === 'en' ? 'Generating planet description' : translatedTexts[25],
    )

    const resultDescription = await sendPlanetData()

    if (!resultDescription) {
      toast.error('Error generating planet description, please try again.')

      setIsLoading(false)
      return
    }

    setIsLoading(false)

    const planet = document.getElementById('field-planet-main-planet')
    const logo = document.getElementById('logo-to-animate')
    const title = document.getElementById('title-to-animate')
    const options = document.getElementById('options-to-animate')
    const properties = document.getElementById('properties-to-animate')
    const button = document.getElementById('button-to-animate')

    if (!planet) return
    if (!logo) return
    if (!title) return
    if (!options) return
    if (!properties) return
    if (!button) return

    planet.classList.add(styles.planetAnimated)
    logo.classList.add(styles.logoAnimated)
    title.classList.add(styles.titleAnimated)
    options.classList.add(styles.optionsAnimated)
    properties.classList.add(styles.propertiesAnimated)
    button.classList.add(styles.buttonAnimated)

    setTimeout(() => {
      navigate('/report')
    }, 1200)
  }

  useEffect(() => {
    const input = document.getElementById('input-name-planet')

    if (!input) return

    if (isNaming) {
      input.focus()
    }
  }, [isNaming])

  return (
    <>
      {isLoading && <Loading label={loadingLabel} />}
      <div className={styles.container} id="field-container">
        <div className={styles.header} id="logo-to-animate">
          <div />
          <img src="/logo.png" alt="Planet Factory" />
          <button onClick={handleChangeLanguage}>
            {idioma === 'en' ? 'PT' : 'EN'}
          </button>
        </div>

        <div className={styles.content}>
          {!isNaming ? (
            <div
              className={styles.fieldTitle}
              onClick={() => {
                if (
                  planetName ===
                  (idioma === 'en' ? 'Name of the planet' : translatedTexts[23])
                ) {
                  setPlanetName('')
                }

                setIsNaming(true)
              }}
            >
              <h1 className={styles.contentTitle} id="title-to-animate">
                {planetName}
              </h1>
            </div>
          ) : (
            <input
              className={styles.inputNamePlanet}
              id="input-name-planet"
              type="text"
              value={planetName}
              onChange={(e) => setPlanetName(e.target.value)}
              onBlur={() => {
                if (planetName === '') {
                  setPlanetName(
                    idioma === 'en'
                      ? 'Name of the planet'
                      : translatedTexts[23],
                  )
                }

                setIsNaming(false)
              }}
            />
          )}

          <div className={styles.mainContent}>
            <div className={styles.chooseContainer}>
              <div
                className={styles.chooseOptionsContainer}
                id="options-to-animate"
              >
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

              <div
                className={styles.optionProperties}
                id="properties-to-animate"
              >
                {getCurrentOption().name ===
                (idioma === 'en' ? 'Attributes' : translatedTexts[12]) ? (
                  <div className={styles.fieldAttributes}>
                    {attributes.map((attributeItem) => (
                      <div
                        key={attributeItem.name}
                        className={styles.attribute}
                      >
                        <p>
                          {attributeItem.name}{' '}
                          <span className={styles.metric}>
                            ({attributeItem.metric_unit})
                          </span>
                        </p>

                        <div className={styles.sliderAttributeField}>
                          <span className={styles.sliderMaxMin}>
                            {attributeItem.showMaxMin(attributeItem.min)}
                          </span>
                          <Slider
                            value={attributeItem.slider}
                            max={attributeItem.max}
                            min={attributeItem.min}
                            marks={[attributeItem.mark]}
                            onChange={(e) => {
                              const newAttributes = attributes.map(
                                (attribute) => {
                                  if (attribute.name === attributeItem.name) {
                                    const target = e.target as HTMLInputElement

                                    const value = parseFloat(target.value)

                                    if (value <= attribute.min) {
                                      return {
                                        ...attribute,
                                        slider: attribute.min,
                                      }
                                    }

                                    if (value >= attribute.max) {
                                      return {
                                        ...attribute,
                                        slider: attribute.max,
                                      }
                                    }

                                    return {
                                      ...attribute,
                                      slider: value,
                                    }
                                  }

                                  return attribute
                                },
                              )

                              setAttributes(newAttributes)
                            }}
                          />
                          <span className={styles.sliderMaxMin}>
                            {attributeItem.showMaxMin(attributeItem.max)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className={styles.optionPropertiesHeader}>
                      <img
                        src={getCurrentOption().icon}
                        alt={getCurrentOption().name}
                      />
                      <h2>{getCurrentOption().name}</h2>
                    </div>

                    <p>{getCurrentOption().description}</p>

                    <div className={styles.sliderField}>
                      <span className={styles.sliderMaxMin}>
                        {getCurrentOption().min}
                        {getCurrentOption().metric_unit}
                      </span>
                      <Slider
                        value={getCurrentOption().slider}
                        max={getCurrentOption().max}
                        min={getCurrentOption().min}
                        marks={[getCurrentOption().mark]}
                        onChange={(e) => {
                          const newOptions = options.map((option) => {
                            if (option.name === currentSelection) {
                              const target = e.target as HTMLInputElement

                              const value = parseFloat(target.value)

                              if (value <= option.min) {
                                return {
                                  ...option,
                                  slider: option.min,
                                }
                              }

                              if (value >= option.max) {
                                return {
                                  ...option,
                                  slider: option.max,
                                }
                              }

                              return {
                                ...option,
                                slider: value,
                              }
                            }

                            return option
                          })

                          setOptions(newOptions)
                        }}
                      />
                      <span className={styles.sliderMaxMin}>
                        {getCurrentOption().max}
                        {getCurrentOption().metric_unit}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={styles.planetField}>
              <Planet size={360} texture="/earth_hd.jpg" name="main-planet" />

              <button onClick={handleNextStep} id="button-to-animate">
                {idioma === 'en' ? 'Generate' : translatedTexts[22]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
