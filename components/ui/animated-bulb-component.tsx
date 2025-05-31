"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AnimatedBulb = ({ size = 'medium' }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const bulbRef = useRef(null);
  const animationRef = useRef(null);
  const geometriesRef = useRef([]);
  const materialsRef = useRef([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Get size dimensions
    const sizeMap = {
      small: { width: 200, height: 200, scale: 0.6 },
      medium: { width: 384, height: 384, scale: 1 },
      large: { width: 600, height: 600, scale: 1.5 }
    };
    
    const dimensions = sizeMap[size] || sizeMap.medium;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, dimensions.width / dimensions.height, 0.1, 1000);
    camera.position.set(0, 0, 8 / dimensions.scale);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.3);
    pointLight.position.set(-5, -5, -5);
    scene.add(pointLight);

    // Create bulb group
    const bulbGroup = new THREE.Group();
    bulbRef.current = bulbGroup;
    scene.add(bulbGroup);

    // Main bulb geometry - scale based on size
    const bulbGeometry = new THREE.SphereGeometry(1.2 * dimensions.scale, 32, 32);
    geometriesRef.current.push(bulbGeometry);
    
    const bulbMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
      emissive: 0xffffff,
      emissiveIntensity: 0.1,
    });
    materialsRef.current.push(bulbMaterial);

    const bulbMesh = new THREE.Mesh(bulbGeometry, bulbMaterial);
    
    // Store original positions for deformation
    const positions = bulbGeometry.attributes.position;
    const originalPositions = new Float32Array(positions.array);
    bulbMesh.userData = { originalPositions };
    
    bulbGroup.add(bulbMesh);

    // Filaments
    const filamentMaterial = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      emissive: 0xffaa00,
      emissiveIntensity: 0.8,
    });
    materialsRef.current.push(filamentMaterial);

    // Center filament
    const filament1Geometry = new THREE.BoxGeometry(0.02 * dimensions.scale, 1.5 * dimensions.scale, 0.02 * dimensions.scale);
    geometriesRef.current.push(filament1Geometry);
    const filament1 = new THREE.Mesh(filament1Geometry, filamentMaterial);
    bulbGroup.add(filament1);

    // Right filament
    const filament2Geometry = new THREE.BoxGeometry(0.02 * dimensions.scale, 1.0 * dimensions.scale, 0.02 * dimensions.scale);
    geometriesRef.current.push(filament2Geometry);
    const filament2 = new THREE.Mesh(filament2Geometry, filamentMaterial);
    filament2.position.x = 0.3 * dimensions.scale;
    filament2.rotation.z = Math.PI / 6;
    bulbGroup.add(filament2);

    // Left filament
    const filament3Geometry = new THREE.BoxGeometry(0.02 * dimensions.scale, 1.0 * dimensions.scale, 0.02 * dimensions.scale);
    geometriesRef.current.push(filament3Geometry);
    const filament3 = new THREE.Mesh(filament3Geometry, filamentMaterial);
    filament3.position.x = -0.3 * dimensions.scale;
    filament3.rotation.z = -Math.PI / 6;
    bulbGroup.add(filament3);

    // Animation loop
    let time = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.016;

      if (bulbRef.current && bulbMesh) {
        // Rotation animation
        bulbRef.current.rotation.y = time * 0.5;
        bulbRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;

        // Floating animation - scale movement
        bulbRef.current.position.y = Math.sin(time * 2) * 0.15 * dimensions.scale;

        // Deform bulb geometry - scale deformation
        const positions = bulbGeometry.attributes.position;
        const originalPos = bulbMesh.userData.originalPositions;

        for (let i = 0; i < positions.count; i++) {
          const x = originalPos[i * 3];
          const y = originalPos[i * 3 + 1];
          const z = originalPos[i * 3 + 2];

          // Wave deformation - scale with size
          const wave1 = Math.sin(time * 2 + x * 3) * 0.03 * dimensions.scale;
          const wave2 = Math.cos(time * 1.5 + y * 2) * 0.02 * dimensions.scale;
          const wave3 = Math.sin(time * 2.5 + z * 2.5) * 0.025 * dimensions.scale;

          positions.array[i * 3] = x + wave1;
          positions.array[i * 3 + 1] = y + wave2;
          positions.array[i * 3 + 2] = z + wave3;
        }

        positions.needsUpdate = true;
        bulbGeometry.computeVertexNormals();
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose geometries
      geometriesRef.current.forEach(geometry => {
        if (geometry) geometry.dispose();
      });
      
      // Dispose materials
      materialsRef.current.forEach(material => {
        if (material) material.dispose();
      });
      
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [size]);

  // Get container size based on size prop
  const getContainerClass = () => {
    switch(size) {
      case 'small': return 'w-52 h-52'; // 208px
      case 'large': return 'w-[600px] h-[600px]';
      default: return 'w-96 h-96'; // 384px
    }
  };

  return (
    <div className={`${getContainerClass()}`}>
      <div ref={mountRef} className="w-full h-full flex items-center justify-center" />
    </div>
  );
};