import React from "react";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function Bubbles() {
  const particlesInit = useCallback(async (engine) => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {

  }, []);
  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#fff",
            },
          },
          fpsLimit: 60,
          emitters: {
            direction: "center",
            size: {
              width: 50,
              height: 50,
            },
            position: {
              x: 50,
              y: 50,
            },
            rate: {
              delay: 2,
              quantity: 8,
            },
          },
          particles: {
            number: {
              value: 0,
            },
            color: {
              value: [
                "#3998D0",
                "#2EB6AF",
                "#A9BD33",
                "#FEC73B",
                "#F89930",
                "#F45623",
                "#D62E32",
                "#EB586E",
                "#9952CF",
              ],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.2,
              random: {
                enable: true,
                minimumValue: 0.3,
              },
            },
            size: {
              value: 200,
              anim: {
                enable: true,
                speed: 20,
                size_min: 2,
                sync: true,
                startValue: "min",
                destroy: "max",
              },
            },
            move: {
              enable: true,
              speed: 5,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "destroy",
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              repulse: {
                distance: 100,
              },
              push: {
                quantity: 4,
              },
            },
          },
          detectRetina: true,
          fullScreen: false,
        }}
      />
    </>
  );
}

export default Bubbles;
