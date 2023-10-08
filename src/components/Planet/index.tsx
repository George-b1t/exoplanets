import * as THREE from 'https://cdn.skypack.dev/three@0.129.0'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js'

import { useEffect } from 'react'

interface IPlanetProps {
  size: number
  texture: string
  name: string
}

export function Planet({ size, texture, name }: IPlanetProps) {
  useEffect(() => {
    if (document.getElementById(name)) return

    let scene, camera, renderer, sphere, controls

    function init() {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(30, 1, 1, 1000)

      loadTexture(texture)
      scene.add(sphere)

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(size, size)

      const fieldPlanet = document.getElementById('field-planet-' + name)

      if (fieldPlanet) {
        fieldPlanet.appendChild(renderer.domElement)
      }

      renderer.domElement.id = name

      controls = new OrbitControls(camera, renderer.domElement)
      controls.minDistance = 20
      controls.maxDistance = 20

      camera.position.z = 20
    }

    function loadTexture(texture) {
      const geometry = new THREE.SphereGeometry(5, 32, 32)
      const loader = new THREE.TextureLoader()
      const earthTexture = loader.load(texture)
      const material = new THREE.MeshBasicMaterial({ map: earthTexture })

      sphere = new THREE.Mesh(geometry, material)
    }

    function animate() {
      requestAnimationFrame(animate)
      sphere.rotation.y += 0.002
      controls.update()
      renderer.render(scene, camera)
    }

    function onWindowResize() {
      camera.aspect = 1
      camera.updateProjectionMatrix()
      renderer.setSize(size, size)
    }

    window.addEventListener('resize', onWindowResize, false)

    init()
    animate()
  }, [])

  return (
    <div
      id={'field-planet-' + name}
      style={{ width: size, height: size }}
    ></div>
  )
}
