"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Environment, OrbitControls, PresentationControls, useGLTF, Float, useTexture, Stars } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { useSpring, a } from "@react-spring/three";

// 未来的なインテリア空間を表現する3Dモデル
function SpaceModel({ scrollY, currentRoomIndex, ...props }) {
  const { viewport } = useThree();
  const group = useRef();
  const roomPositions = useMemo(() => [
    [0, 0, 0],         // 最初の部屋の位置
    [15, 0, 0],        // 2番目の部屋
    [0, 0, -15],       // 3番目の部屋
    [-15, 0, 0]        // 4番目の部屋
  ], []);

  // スクロール位置に応じて部屋を移動
  const { position } = useSpring({
    position: roomPositions[currentRoomIndex],
    config: { mass: 1, tension: 100, friction: 30 }
  });

  // スクロール位置に応じてモデルを回転させる
  useEffect(() => {
    if (group.current) {
      gsap.to(group.current.rotation, {
        y: scrollY * 0.005,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [scrollY]);

  useFrame((state) => {
    if (!group.current) return;

    // マウス位置に応じて少し傾ける
    const mouseX = (state.pointer.x * viewport.width) / 50;
    const mouseY = (state.pointer.y * viewport.height) / 50;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      mouseY * 0.05,
      0.05
    );

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouseX * 0.05 + scrollY * 0.005,
      0.05
    );
  });

  return (
    <a.group ref={group} {...props} position={position}>
      {/* 4つの部屋を作成 */}
      <Room1 position={[0, 0, 0]} />
      <Room2 position={[15, 0, 0]} />
      <Room3 position={[0, 0, -15]} />
      <Room4 position={[-15, 0, 0]} />
    </a.group>
  );
}

// 部屋1: モダンで明るい部屋
function Room1({ ...props }) {
  return (
    <group {...props}>
      {/* 床 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#f2f1ea" metalness={0.2} roughness={0.1} />
      </mesh>

      {/* 壁 - 奥 */}
      <mesh position={[0, 3, -6]} receiveShadow>
        <boxGeometry args={[12, 10, 0.2]} />
        <meshStandardMaterial color="#f2f1ea" metalness={0.1} roughness={0.1} />
      </mesh>

      {/* 壁 - 左 */}
      <mesh position={[-6, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 10, 0.2]} />
        <meshStandardMaterial color="#f2f1ea" metalness={0.1} roughness={0.1} />
      </mesh>

      {/* 壁 - 右 */}
      <mesh position={[6, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 10, 0.2]} />
        <meshStandardMaterial color="#f2f1ea" metalness={0.1} roughness={0.1} />
      </mesh>

      {/* 家具: モダンなソファ */}
      <group position={[0, -1, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4, 0.5, 2]} />
          <meshPhysicalMaterial
            color="#876647"
            metalness={0.1}
            roughness={0.4}
            clearcoat={0.5}
            clearcoatRoughness={0.2}
          />
        </mesh>

        {/* 背もたれ */}
        <mesh position={[0, 0.5, -0.9]} castShadow>
          <boxGeometry args={[4, 0.8, 0.2]} />
          <meshPhysicalMaterial
            color="#876647"
            metalness={0.1}
            roughness={0.4}
            clearcoat={0.5}
            clearcoatRoughness={0.2}
          />
        </mesh>
      </group>

      {/* テーブル */}
      <mesh position={[0, -1.5, 2]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshPhysicalMaterial
          color="#cfc7b9"
          metalness={0.3}
          roughness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 装飾オブジェクト */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, -1.2, 2]} castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshPhysicalMaterial
            color="#9e8c57"
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>

      {/* 天井の照明 */}
      <mesh position={[0, 5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <pointLight position={[0, 5, 0]} intensity={3} color="#ffffff" distance={12} decay={2} castShadow />
    </group>
  );
}

// 部屋2: 青を基調とした未来的な部屋
function Room2({ ...props }) {
  return (
    <group {...props}>
      {/* 床 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#a4b9c3" metalness={0.5} roughness={0.1} />
      </mesh>

      {/* 壁 - 奥 */}
      <mesh position={[0, 3, -6]} receiveShadow>
        <boxGeometry args={[12, 10, 0.2]} />
        <meshStandardMaterial color="#e5f4ff" metalness={0.3} roughness={0.1} />
      </mesh>

      {/* 壁 - 左 */}
      <mesh position={[-6, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 10, 0.2]} />
        <meshStandardMaterial color="#e5f4ff" metalness={0.3} roughness={0.1} />
      </mesh>

      {/* 壁 - 右 */}
      <mesh position={[6, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 10, 0.2]} />
        <meshStandardMaterial color="#e5f4ff" metalness={0.3} roughness={0.1} />
      </mesh>

      {/* 家具: 未来的なソファ */}
      <group position={[0, -1.3, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5, 0.3, 2.2]} />
          <meshPhysicalMaterial
            color="#a4b9c3"
            metalness={0.6}
            roughness={0.2}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* 湾曲した背もたれ */}
        <mesh position={[0, 0.6, -0.9]} castShadow>
          <cylinderGeometry args={[2.6, 2.6, 1.2, 32, 1, true, Math.PI * 0.25, Math.PI * 0.5]} />
          <meshPhysicalMaterial
            color="#a4b9c3"
            metalness={0.6}
            roughness={0.2}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* テーブル */}
      <mesh position={[0, -1.7, 2]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.1, 1.8]} />
        <meshPhysicalMaterial
          color="#e5f4ff"
          metalness={0.5}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transmission={0.2}
        />
      </mesh>

      {/* 装飾オブジェクト */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[0, -1.3, 2]} castShadow>
          <torusKnotGeometry args={[0.3, 0.1, 64, 32]} />
          <meshPhysicalMaterial
            color="#4fc3f7"
            metalness={0.8}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            emissive="#4fc3f7"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* 天井の照明 */}
      <mesh position={[0, 5, 0]}>
        <ringGeometry args={[1.2, 1.8, 32]} />
        <meshBasicMaterial color="#4fc3f7" side={THREE.DoubleSide} />
      </mesh>
      <pointLight position={[0, 5, 0]} intensity={2} color="#4fc3f7" distance={12} decay={2} castShadow />
    </group>
  );
}

// 部屋3: 緑を基調とした有機的な部屋
function Room3({ ...props }) {
  return (
    <group {...props}>
      {/* 床 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#6f9f90" metalness={0.2} roughness={0.4} />
      </mesh>

      {/* 壁 - 奥 */}
      <mesh position={[0, 3, -6]} receiveShadow>
        <boxGeometry args={[12, 10, 0.2]} />
        <meshStandardMaterial color="#e0f2e9" metalness={0.1} roughness={0.3} />
      </mesh>

      {/* 壁 - 左 */}
      <mesh position={[-6, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 10, 0.2]} />
        <meshStandardMaterial color="#e0f2e9" metalness={0.1} roughness={0.3} />
      </mesh>

      {/* 壁 - 右 */}
      <mesh position={[6, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 10, 0.2]} />
        <meshStandardMaterial color="#e0f2e9" metalness={0.1} roughness={0.3} />
      </mesh>

      {/* 家具: 有機的な形のソファ */}
      <group position={[0, -1.2, 0]}>
        <mesh castShadow receiveShadow>
          <torusGeometry args={[2, 0.8, 32, 32, Math.PI]} />
          <meshPhysicalMaterial
            color="#6f9f90"
            metalness={0.2}
            roughness={0.5}
            clearcoat={0.3}
            clearcoatRoughness={0.3}
          />
        </mesh>
      </group>

      {/* テーブル */}
      <mesh position={[0, -1.6, 2]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1, 0.2, 32]} />
        <meshPhysicalMaterial
          color="#b7dfd1"
          metalness={0.2}
          roughness={0.4}
          clearcoat={0.4}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* 植物のような装飾 */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
        <group position={[0, -1.2, 2]}>
          <mesh castShadow>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshPhysicalMaterial
              color="#2e7d32"
              metalness={0.1}
              roughness={0.6}
            />
          </mesh>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh
              key={i}
              position={[
                0.05 * Math.sin(i * Math.PI / 2.5),
                0.15 + 0.05 * i,
                0.05 * Math.cos(i * Math.PI / 2.5)
              ]}
              castShadow
            >
              <boxGeometry args={[0.05, 0.2, 0.02]} />
              <meshPhysicalMaterial
                color="#4caf50"
                metalness={0.1}
                roughness={0.6}
              />
            </mesh>
          ))}
        </group>
      </Float>

      {/* 天井の照明 */}
      <mesh position={[0, 5, 0]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#81c784" />
      </mesh>
      <pointLight position={[0, 5, 0]} intensity={2} color="#81c784" distance={12} decay={2} castShadow />
    </group>
  );
}

// 部屋4: 紫を基調とした豪華な部屋
function Room4({ ...props }) {
  return (
    <group {...props}>
      {/* 床 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#b6abae" metalness={0.4} roughness={0.2} />
      </mesh>

      {/* 壁 - 奥 */}
      <mesh position={[0, 3, -6]} receiveShadow>
        <boxGeometry args={[12, 10, 0.2]} />
        <meshStandardMaterial color="#f5f0f5" metalness={0.3} roughness={0.2} />
      </mesh>

      {/* 壁 - 左 */}
      <mesh position={[-6, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 10, 0.2]} />
        <meshStandardMaterial color="#f5f0f5" metalness={0.3} roughness={0.2} />
      </mesh>

      {/* 壁 - 右 */}
      <mesh position={[6, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 10, 0.2]} />
        <meshStandardMaterial color="#f5f0f5" metalness={0.3} roughness={0.2} />
      </mesh>

      {/* 家具: 豪華なL字型ソファ */}
      <group position={[0, -1.2, 0]}>
        <mesh position={[-1, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 0.6, 2]} />
          <meshPhysicalMaterial
            color="#b6abae"
            metalness={0.3}
            roughness={0.3}
            clearcoat={0.6}
            clearcoatRoughness={0.1}
          />
        </mesh>
        <mesh position={[1, 0, 1]} castShadow receiveShadow>
          <boxGeometry args={[1, 0.6, 4]} />
          <meshPhysicalMaterial
            color="#b6abae"
            metalness={0.3}
            roughness={0.3}
            clearcoat={0.6}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* 背もたれ */}
        <mesh position={[-1, 0.6, -0.9]} castShadow>
          <boxGeometry args={[3, 0.8, 0.2]} />
          <meshPhysicalMaterial
            color="#b6abae"
            metalness={0.3}
            roughness={0.3}
            clearcoat={0.6}
            clearcoatRoughness={0.1}
          />
        </mesh>
        <mesh position={[1.45, 0.6, 1]} castShadow rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[4, 0.8, 0.2]} />
          <meshPhysicalMaterial
            color="#b6abae"
            metalness={0.3}
            roughness={0.3}
            clearcoat={0.6}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </group>

      {/* テーブル */}
      <mesh position={[0, -1.6, 2]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.2, 1.5]} />
        <meshPhysicalMaterial
          color="#e1bee7"
          metalness={0.4}
          roughness={0.2}
          clearcoat={0.7}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 装飾オブジェクト */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, -1.3, 2]} castShadow>
          <octahedronGeometry args={[0.3, 0]} />
          <meshPhysicalMaterial
            color="#9c27b0"
            metalness={0.7}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            emissive="#9c27b0"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* 天井の照明 */}
      <mesh position={[0, 5, 0]}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color="#ce93d8" />
      </mesh>
      <pointLight position={[0, 5, 0]} intensity={2} color="#ce93d8" distance={12} decay={2} castShadow />
    </group>
  );
}

// 浮遊する幾何学オブジェクト
function FloatingObjects({ count = 5, scrollY, roomIndex }) {
  const meshes = useRef([]);
  const group = useRef();

  // 部屋のテーマカラー
  const roomColors = useMemo(() => [
    ["#9e8c57", "#876647", "#cfc7b9"],  // 部屋1のカラー
    ["#4fc3f7", "#a4b9c3", "#e5f4ff"],  // 部屋2のカラー
    ["#81c784", "#6f9f90", "#b7dfd1"],  // 部屋3のカラー
    ["#ce93d8", "#b6abae", "#e1bee7"]   // 部屋4のカラー
  ], []);

  useFrame((state) => {
    if (!group.current) return;

    // グループ全体の回転をスクロール位置に基づいて変更
    group.current.rotation.y = scrollY * 0.005;

    // 個々のオブジェクトをアニメーション
    meshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const t = state.clock.getElapsedTime() + i * 1000;
      mesh.position.y = Math.sin(t * 0.5) * 0.5;
      mesh.rotation.x = Math.sin(t * 0.3) * 0.2;
      mesh.rotation.z = Math.sin(t * 0.2) * 0.2;
    });
  });

  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => {
        const posX = (Math.random() - 0.5) * 10;
        const posZ = (Math.random() - 0.5) * 10;
        const scale = 0.2 + Math.random() * 0.3;
        const shape = Math.floor(Math.random() * 5); // ランダムな形状
        const colorIndex = Math.floor(Math.random() * 3); // 現在の部屋のカラーパレットからランダムに選択

        return (
          <mesh
            key={i}
            ref={(el) => (meshes.current[i] = el)}
            position={[posX, 1 + i * 0.5, posZ]}
            scale={[scale, scale, scale]}
            castShadow
          >
            {shape === 0 && <icosahedronGeometry args={[1, 0]} />}
            {shape === 1 && <octahedronGeometry args={[1, 0]} />}
            {shape === 2 && <tetrahedronGeometry args={[1, 0]} />}
            {shape === 3 && <dodecahedronGeometry args={[1, 0]} />}
            {shape === 4 && <sphereGeometry args={[1, 16, 16]} />}
            <meshPhysicalMaterial
              color={roomColors[roomIndex][colorIndex]}
              metalness={0.8}
              roughness={0.2}
              clearcoat={0.8}
              transmission={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ライトビーム
function LightBeams({ scrollY, roomIndex }) {
  const beams = useRef([]);
  const group = useRef();

  // 部屋のライトカラー
  const roomColors = useMemo(() => [
    "#ffffff",  // 部屋1
    "#4fc3f7",  // 部屋2
    "#81c784",  // 部屋3
    "#ce93d8"   // 部屋4
  ], []);

  useFrame((state) => {
    if (!group.current) return;

    // スクロールに応じてビームを回転
    group.current.rotation.y = scrollY * 0.003;

    // ビームのアニメーション
    beams.current.forEach((beam, i) => {
      if (!beam) return;
      const t = state.clock.getElapsedTime();
      beam.position.y = Math.sin(t * 0.3 + i) * 0.5;
      beam.material.opacity = (Math.sin(t * 0.5 + i) + 1) * 0.25;
    });
  });

  return (
    <group ref={group}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh
            key={i}
            ref={(el) => (beams.current[i] = el)}
            position={[x, 1, z]}
            rotation={[0, -angle + Math.PI/2, 0]}
          >
            <planeGeometry args={[0.1, 10]} />
            <meshBasicMaterial
              color={roomColors[roomIndex]}
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// メインの3Dシーンコンポーネント
export default function ThreeScene({ scrollY = 0 }) {
  // 部屋のインデックスを計算
  const roomIndex = Math.min(Math.floor(scrollY / 800) % 4, 3);

  return (
    <div className="h-screen w-full absolute top-0 left-0 z-0 pointer-events-none">
      <Canvas
        className="touch-none"
        shadows
        camera={{ position: [0, 1, 8], fov: 45 }}
        gl={{ antialias: true }}
        dpr={[1, 2]} // 解像度の設定
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#000000"]} />
          <fog attach="fog" args={["#000000", 10, 30]} />

          <ambientLight intensity={0.2} />
          <spotLight
            position={[5, 10, 5]}
            angle={0.3}
            penumbra={1}
            intensity={0.8}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />

          <SpaceModel scrollY={scrollY} currentRoomIndex={roomIndex} />
          <FloatingObjects scrollY={scrollY} roomIndex={roomIndex} count={8} />
          <LightBeams scrollY={scrollY} roomIndex={roomIndex} />

          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
