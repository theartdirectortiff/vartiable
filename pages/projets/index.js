import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import Container from "@/components/container";

function Scene({ objref }) {
  useFrame(() => {
    objref.current.rotation.y += 0.002;
  });

  const gltf = useLoader(GLTFLoader, "/models/macintosh/scene.gltf");

  return (
    <>
      <ambientLight intensity={0.65} />
      <primitive
        ref={objref}
        scale={[1.5, 1.5, 1.5]}
        object={gltf.scene}
        receiveShadow
        castShadow
      />
    </>
  );
}

export default function Projects() {
  const [projectsList, setProjectsList] = useState(false);
  const tl = gsap.timeline({ paused: true });

  const dom = useRef();
  const macObjRef = useRef();
  const handleProjectsListClick = () => {
    tl.to(macObjRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.5,
      ease: "power2.out",
    })
      .to(
        macObjRef.current.rotation,
        {
          y: (180 * Math.PI) / 180,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .to(
        dom.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=1"
      );
    tl.play();

    setProjectsList(!projectsList);
  };

  return (
    <section className="h-screen">
      <Canvas>
        <Scene objref={macObjRef} scale={1} />
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          enableDamping
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 4}
        />
      </Canvas>
      <div
        ref={dom}
        id="cacs"
        className="fixed bottom-0 left-0 right-0 flex flex-col items-center"
      >
        <div className="flex gap-2">
          <button className="px-4 py-1 bg-white text-midnight rounded-full flex">
            RANDOM CHOICE
          </button>
          <button
            onClick={handleProjectsListClick}
            className="px-4 py-1 bg-white text-midnight rounded-full flex"
          >
            Projects List
          </button>
        </div>
        <div className="flex gap-2 py-8">
          <div className="w-48 h-48 bg-red-500 rounded-md project-item"></div>
          <div className="w-48 h-48 bg-red-500 rounded-md project-item"></div>
          <div className="w-48 h-48 bg-red-500 rounded-md project-item"></div>
          <div className="w-48 h-48 bg-red-500 rounded-md project-item"></div>
        </div>
      </div>

      <motion.div
        animate={projectsList ? "open" : "closed"}
        initial="closed"
        className="fixed top-0 bottom-0 left-0 right-0 py-36"
        variants={{
          open: {
            y: 0,
            transition: {
              animationDelay: 1,
              type: "tween",
              ease: [0.4, 0, 0.2, 1],
            },
          },
          closed: {
            y: "100vh",
            transition: {
              type: "tween",
              ease: [0.4, 0, 0.2, 1],
            },
          },
        }}
      >
        <Container>
          <h2 className="text-tournesol text-6xl uppercase">Projects List</h2>
          <button
            onClick={() => {
              tl.pause();
              setProjectsList(!projectsList);
            }}
          >
            Close
          </button>
        </Container>
      </motion.div>
    </section>
  );
}
