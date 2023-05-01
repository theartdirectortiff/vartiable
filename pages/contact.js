import Container from "@/components/container";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Scene({ objref, contactForm, setContactForm }) {
  useFrame(() => {
    objref.current.rotation.y += 0.002;
  });

  const gltf = useLoader(GLTFLoader, "/models/nokia_2/scene.gltf");

  return (
    <>
      <ambientLight intensity={2.35} />
      <primitive
        ref={objref}
        scale={[0.01, 0.01, 0.01]}
        object={gltf.scene}
        receiveShadow
        castShadow
        onClick={() => setContactForm(!contactForm)}
      />
    </>
  );
}

export default function Contact() {
  const [contactForm, setContactForm] = useState(false);
  const objRef = useRef(false);

  return (
    <>
      <div className="h-screen w-screen absolute z-0">
        <Canvas>
          <Scene
            contactForm={contactForm}
            setContactForm={setContactForm}
            objref={objRef}
            scale={1}
          />
          <OrbitControls
            makeDefault
            enableZoom={false}
            enablePan={false}
            enableDamping
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 4}
          />
        </Canvas>
      </div>
      <div className="top-48 relative">
        <Container>
          <h1 className="text-tournesol text-center text-[5vw] uppercase">
            TOUCH THE COFE
          </h1>
          <p className="text-center opacity-50">
            To discover why its cool to drink a coffee with us
          </p>
          <motion.form
            animate={contactForm ? "open" : "closed"}
            initial="closed"
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
            className="fixed bottom-0 left-0 right-0 dark:bg-white dark:text-midnight text-white bg-midnight m-12 border border-midnight"
          >
            <div className="border-b border-midnight p-8 flex justify-between items-center">
              <h2 className="text-3xl uppercase">Claim your coffee time</h2>
              <svg className="w-20" viewBox="0 0 248 76" fill="none">
                <mask id="path-1-inside-1_0_1" fill="white">
                  <path d="M86 0H162V76H86V0Z" />
                </mask>
                <path d="M86 0H162V76H86V0Z" fill="white" />
                <path
                  d="M86 0V-2H84V0H86ZM162 0H164V-2H162V0ZM162 76V84H164V76H162ZM86 76H84V84H86V76ZM86 2H162V-2H86V2ZM160 0V76H164V0H160ZM162 68H86V84H162V68ZM88 76V0H84V76H88Z"
                  fill="#EB1E1E"
                  mask="url(#path-1-inside-1_0_1)"
                />
                <rect
                  x="108"
                  y="21"
                  width="32"
                  height="32"
                  fill="white"
                  stroke="#EB1E1E"
                  stroke-width="6"
                />
                <mask id="path-4-inside-2_0_1" fill="white">
                  <path d="M0 0H76V76H0V0Z" />
                </mask>
                <path d="M0 0H76V76H0V0Z" fill="white" />
                <path
                  d="M0 0V-2H-2V0H0ZM76 0H78V-2H76V0ZM76 76V84H78V76H76ZM0 76H-2V84H0V76ZM0 2H76V-2H0V2ZM74 0V76H78V0H74ZM76 68H0V84H76V68ZM2 76V0H-2V76H2Z"
                  fill="#EB1E1E"
                  mask="url(#path-4-inside-2_0_1)"
                />
                <path d="M19 53H57" stroke="#EB1E1E" stroke-width="6" />
                <mask id="path-7-inside-3_0_1" fill="white">
                  <path d="M172 0H248V76H172V0Z" />
                </mask>
                <path d="M172 0H248V76H172V0Z" fill="white" />
                <path
                  d="M172 0V-2H170V0H172ZM248 0H250V-2H248V0ZM248 76V84H250V76H248ZM172 76H170V84H172V76ZM172 2H248V-2H172V2ZM246 0V76H250V0H246ZM248 68H172V84H248V68ZM174 76V0H170V76H174Z"
                  fill="#EB1E1E"
                  mask="url(#path-7-inside-3_0_1)"
                />
                <path
                  d="M196 50.8672L222.87 23.9971"
                  stroke="#EB1E1E"
                  stroke-width="6"
                />
                <path
                  d="M196.436 24.4375L223.306 51.3076"
                  stroke="#EB1E1E"
                  stroke-width="6"
                />
              </svg>
            </div>
            <div className="w-full grid grid-cols-1 gap-4 p-8">
              <div className="w-full grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="p-4 bg-transparent border border-midnight"
                />
                <input
                  type="text"
                  placeholder="Name"
                  className="p-4 bg-transparent border border-midnight"
                />
              </div>
              <textarea
                placeholder="Message"
                className="p-4 bg-transparent border border-midnight"
              ></textarea>
              <div className="flex justify-end">
                <button className="p-4 px-10 text-white bg-midnight">
                  Send
                </button>
              </div>
            </div>
          </motion.form>
        </Container>
      </div>
    </>
  );
}
