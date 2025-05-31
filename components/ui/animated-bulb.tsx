import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

type SizeType = 'small' | 'medium' | 'large'

interface AnimatedBulbProps {
  size?: SizeType
}

const AnimatedBulb = ({ size = 'medium' }: AnimatedBulbProps) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const bulbRef = useRef<THREE.Group | null>(null)
  const animationRef = useRef<number | null>(null)
  const geometriesRef = useRef<THREE.BufferGeometry[]>([])
  const materialsRef = useRef<THREE.Material[]>([])

  useEffect(() => {
    if (!mountRef.current) return

    // Get size dimensions
    const sizeMap: Record<
      SizeType,
      { width: number; height: number; scale: number; cameraZ: number }
    > = {
      small: { width: 24, height: 24, scale: 1, cameraZ: 3 },
      medium: { width: 384, height: 384, scale: 1, cameraZ: 8 },
      large: { width: 600, height: 600, scale: 1.5, cameraZ: 10 },
    }

    const dimensions = sizeMap[size] || sizeMap.medium

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      dimensions.width / dimensions.height,
      0.1,
      1000
    )
    camera.position.set(0, 0, dimensions.cameraZ)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(dimensions.width, dimensions.height)
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer

    mountRef.current.appendChild(renderer.domElement)

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.3)
    pointLight.position.set(-5, -5, -5)
    scene.add(pointLight)

    // Create bulb group
    const bulbGroup = new THREE.Group()
    bulbRef.current = bulbGroup
    scene.add(bulbGroup)

    // Main bulb geometry - adjust size for small viewport
    const bulbSize = size === 'small' ? 0.8 : 1.2 * dimensions.scale
    const bulbGeometry = new THREE.SphereGeometry(bulbSize, 32, 32)
    geometriesRef.current.push(bulbGeometry)

    const bulbMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
      emissive: 0xffffff,
      emissiveIntensity: 0.1,
    })
    materialsRef.current.push(bulbMaterial)

    const bulbMesh = new THREE.Mesh(bulbGeometry, bulbMaterial)

    // Store original positions for deformation
    const positions = bulbGeometry.attributes.position
    const originalPositions = new Float32Array(positions.array)
    bulbMesh.userData = { originalPositions }

    bulbGroup.add(bulbMesh)

    // Filaments - Use MeshPhongMaterial for emissive properties
    const filamentMaterial = new THREE.MeshPhongMaterial({
      color: 0xffaa00,
      emissive: 0xffaa00,
      emissiveIntensity: 0.8,
    })
    materialsRef.current.push(filamentMaterial)

    // Filament sizes adjusted for different viewport sizes
    const filamentScale = size === 'small' ? 0.7 : dimensions.scale

    // Center filament
    const filament1Geometry = new THREE.BoxGeometry(
      0.02 * filamentScale,
      1.0 * filamentScale,
      0.02 * filamentScale
    )
    geometriesRef.current.push(filament1Geometry)
    const filament1 = new THREE.Mesh(filament1Geometry, filamentMaterial)
    bulbGroup.add(filament1)

    // Right filament
    const filament2Geometry = new THREE.BoxGeometry(
      0.02 * filamentScale,
      0.6 * filamentScale,
      0.02 * filamentScale
    )
    geometriesRef.current.push(filament2Geometry)
    const filament2 = new THREE.Mesh(filament2Geometry, filamentMaterial)
    filament2.position.x = 0.2 * filamentScale
    filament2.rotation.z = Math.PI / 6
    bulbGroup.add(filament2)

    // Left filament
    const filament3Geometry = new THREE.BoxGeometry(
      0.02 * filamentScale,
      0.6 * filamentScale,
      0.02 * filamentScale
    )
    geometriesRef.current.push(filament3Geometry)
    const filament3 = new THREE.Mesh(filament3Geometry, filamentMaterial)
    filament3.position.x = -0.2 * filamentScale
    filament3.rotation.z = -Math.PI / 6
    bulbGroup.add(filament3)

    // Animation loop
    let time = 0
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)
      time += 0.016

      if (bulbRef.current && bulbMesh) {
        // Rotation animation
        bulbRef.current.rotation.y = time * 0.5
        bulbRef.current.rotation.x = Math.sin(time * 0.3) * 0.1

        // Floating animation - adjusted for small size
        const floatScale = size === 'small' ? 0.05 : 0.15 * dimensions.scale
        bulbRef.current.position.y = Math.sin(time * 2) * floatScale

        // Deform bulb geometry - adjusted for small size
        const positions = bulbGeometry.attributes.position
        const originalPos = bulbMesh.userData.originalPositions
        const waveScale = size === 'small' ? 0.01 : dimensions.scale

        for (let i = 0; i < positions.count; i++) {
          const x = originalPos[i * 3]
          const y = originalPos[i * 3 + 1]
          const z = originalPos[i * 3 + 2]

          // Wave deformation - adjusted for viewport
          const wave1 = Math.sin(time * 2 + x * 3) * 0.03 * waveScale
          const wave2 = Math.cos(time * 1.5 + y * 2) * 0.02 * waveScale
          const wave3 = Math.sin(time * 2.5 + z * 2.5) * 0.025 * waveScale

          positions.array[i * 3] = x + wave1
          positions.array[i * 3 + 1] = y + wave2
          positions.array[i * 3 + 2] = z + wave3
        }

        positions.needsUpdate = true
        bulbGeometry.computeVertexNormals()
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (
        mountRef.current &&
        renderer.domElement &&
        mountRef.current.contains(renderer.domElement)
      ) {
        mountRef.current.removeChild(renderer.domElement)
      }

      // Dispose geometries
      geometriesRef.current.forEach(geometry => {
        if (geometry) geometry.dispose()
      })

      // Dispose materials
      materialsRef.current.forEach(material => {
        if (material) material.dispose()
      })

      if (renderer) {
        renderer.dispose()
      }
    }
  }, [size])

  // Get container size based on size prop
  const getContainerClass = () => {
    switch (size) {
      case 'small':
        return 'w-6 h-6' // 24px
      case 'large':
        return 'w-[600px] h-[600px]'
      default:
        return 'w-96 h-96' // 384px
    }
  }

  return (
    <div className={`${getContainerClass()}`}>
      <div
        ref={mountRef}
        className="w-full h-full flex items-center justify-center"
      />
    </div>
  )
}

export default AnimatedBulb
