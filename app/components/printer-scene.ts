import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export type PrinterScene = {
  setPlaying: (playing: boolean) => void;
  showFinished: () => void;
  dispose: () => void;
};

/** A stylized A1 + AMS Lite, not a dimensionally accurate CAD model. */
export function createPrinterScene(host: HTMLDivElement): PrinterScene {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.localClippingEnabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
  camera.position.set(5.4, 4.8, 13.4);
  camera.lookAt(0.35, 1.9, 0);
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const material = (
    color: string,
    options: THREE.MeshStandardMaterialParameters = {},
  ) => {
    const m = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.6,
      ...options,
    });
    materials.add(m);
    return m;
  };
  const ivory = material("#e9e7e1");
  const silver = material("#b5bdc0", { metalness: 0.65, roughness: 0.32 });
  const dark = material("#30383b");
  const black = material("#182025");
  const plate = material("#55564f", { metalness: 0.3, roughness: 0.85 });
  const brass = material("#dba251", { metalness: 0.6 });
  const lilac = material("#bea7d8");
  const spoolShell = material("#ccd0cc", { roughness: 0.72 });
  const feederYellow = material("#d8b33b");
  const white = material("#fff8e9");
  const red = material("#cc382e");
  const tubeMaterial = material("#a6b4af", { roughness: 0.65 });

  const mesh = (
    geometry: THREE.BufferGeometry,
    mat: THREE.Material,
    parent: THREE.Object3D,
    position: [number, number, number] = [0, 0, 0],
  ) => {
    geometries.add(geometry);
    const object = new THREE.Mesh(geometry, mat);
    object.position.set(...position);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  };
  const box = (
    parent: THREE.Object3D,
    dimensions: [number, number, number],
    position: [number, number, number],
    mat: THREE.Material,
    radius = 0.04,
  ) =>
    mesh(
      new RoundedBoxGeometry(
        ...dimensions,
        2,
        Math.min(radius, Math.min(...dimensions) / 2),
      ),
      mat,
      parent,
      position,
    );
  const cylinder = (
    parent: THREE.Object3D,
    radius: number,
    height: number,
    position: [number, number, number],
    mat: THREE.Material,
    topRadius = radius,
  ) =>
    mesh(
      new THREE.CylinderGeometry(topRadius, radius, height, 40),
      mat,
      parent,
      position,
    );
  const rod = (
    parent: THREE.Object3D,
    from: THREE.Vector3,
    to: THREE.Vector3,
    radius: number,
    mat: THREE.Material,
  ) => {
    const center = from.clone().add(to).multiplyScalar(0.5);
    const part = cylinder(
      parent,
      radius,
      from.distanceTo(to),
      center.toArray() as [number, number, number],
      mat,
    );
    part.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      to.clone().sub(from).normalize(),
    );
    return part;
  };
  const label = (
    text: string,
    width: number,
    height: number,
    color: string,
    background: string,
    parent: THREE.Object3D,
    position: [number, number, number],
  ) => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const context = canvas.getContext("2d")!;
    context.fillStyle = background;
    context.fillRect(0, 0, 512, 128);
    context.fillStyle = color;
    context.font = "600 56px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, 256, 68);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    textures.add(texture);
    const mat = new THREE.MeshBasicMaterial({ map: texture });
    materials.add(mat);
    const plane = mesh(
      new THREE.PlaneGeometry(width, height),
      mat,
      parent,
      position,
    );
    plane.castShadow = false;
    return plane;
  };

  scene.add(new THREE.HemisphereLight(0xfffaf1, 0x9c8b9f, 1.8));
  const key = new THREE.DirectionalLight(0xfff4df, 2.5);
  key.position.set(-3, 8, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -6;
  key.shadow.camera.right = 6;
  key.shadow.camera.top = 6;
  key.shadow.camera.bottom = -6;
  key.shadow.normalBias = 0.035;
  key.shadow.bias = -0.0002;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xded4ff, 1.3);
  fill.position.set(5, 4, -3);
  scene.add(fill);

  const stage = cylinder(
    scene,
    4.35,
    0.12,
    [0.2, -0.16, 0],
    material("#eee4dc"),
  );
  stage.scale.z = 0.74;
  const printer = new THREE.Group();
  printer.position.x = -1.3;
  scene.add(printer);
  box(printer, [3.65, 0.36, 3.05], [-0.1, 0.18, 0.15], ivory, 0.15);
  box(printer, [3.45, 0.14, 2.85], [-0.1, 0.04, 0.15], dark);
  for (let i = 0; i < 6; i++)
    box(
      printer,
      [0.035, 0.1, 0.012],
      [1.15 + i * 0.065, 0.19, 1.68],
      dark,
      0.004,
    );
  for (const x of [-1.35, 1.35])
    for (const z of [-0.95, 1.25])
      cylinder(printer, 0.14, 0.12, [x, -0.035, z], black);
  box(printer, [0.5, 0.09, 2.6], [0, 0.4, 0.1], dark);
  for (const x of [-0.55, 0.55])
    rod(
      printer,
      new THREE.Vector3(x, 0.4, -1.1),
      new THREE.Vector3(x, 0.4, 1.35),
      0.035,
      silver,
    );

  // Twin Z columns, lead screws and fixed upper bridge distinguish the A1.
  for (const x of [-1.45, 1.45]) {
    box(printer, [0.24, 3.65, 0.32], [x, 2.15, -0.82], silver, 0.025);
    box(printer, [0.055, 3.48, 0.04], [x - 0.045, 2.15, -0.635], dark, 0.008);
    rod(
      printer,
      new THREE.Vector3(x + 0.07, 0.5, -0.6),
      new THREE.Vector3(x + 0.07, 3.92, -0.6),
      0.027,
      silver,
    );
    box(printer, [0.4, 0.32, 0.48], [x, 0.5, -0.82], ivory, 0.07);
    box(printer, [0.4, 0.26, 0.46], [x, 4.04, -0.82], ivory, 0.07);
  }
  box(printer, [3.22, 0.24, 0.37], [0, 4.04, -0.82], ivory, 0.055);
  for (const x of [-1.45, 1.45]) {
    box(printer, [0.35, 0.24, 0.4], [x, 4.04, -0.82], dark, 0.045);
  }

  const bed = new THREE.Group();
  printer.add(bed);
  box(bed, [2.57, 0.14, 2.57], [0, 0.48, 0.12], dark, 0.07);
  box(bed, [2.5, 0.055, 2.5], [0, 0.575, 0.12], plate, 0.025);
  box(bed, [0.65, 0.055, 0.18], [0, 0.575, 1.43], silver, 0.02);
  // Fine, stationary grid on the textured build plate.
  const gridVertices: number[] = [];
  for (let i = -10; i <= 10; i++) {
    const v = i * 0.115;
    gridVertices.push(
      -1.15,
      0.606,
      v + 0.12,
      1.15,
      0.606,
      v + 0.12,
      v,
      0.606,
      -1.03,
      v,
      0.606,
      1.27,
    );
  }
  const gridGeo = new THREE.BufferGeometry();
  gridGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(gridVertices, 3),
  );
  geometries.add(gridGeo);
  const gridMat = new THREE.LineBasicMaterial({
    color: 0xb5b5a8,
    transparent: true,
    opacity: 0.12,
  });
  materials.add(gridMat);
  bed.add(new THREE.LineSegments(gridGeo, gridMat));

  const gantry = new THREE.Group();
  printer.add(gantry);
  box(gantry, [3.03, 0.27, 0.3], [0, 0, -0.55], silver);
  box(gantry, [2.83, 0.065, 0.06], [0, 0, -0.36], dark, 0.01);
  for (const x of [-1.46, 1.46])
    box(gantry, [0.38, 0.42, 0.5], [x, 0, -0.65], ivory, 0.08);
  // Exposed linear rail, fasteners, right motor housing and left purge wiper.
  box(gantry, [2.83, 0.19, 0.035], [0, 0, -0.315], silver, 0.01);
  for (let i = -6; i <= 6; i++) {
    const screw = cylinder(gantry, 0.023, 0.012, [i * 0.215, 0, -0.29], dark);
    screw.rotation.x = Math.PI / 2;
  }
  box(gantry, [0.5, 0.48, 0.58], [1.46, 0, -0.57], ivory, 0.045);
  label("A1", 0.2, 0.11, "#50575b", "#e9e7e1", gantry, [1.52, 0.1, -0.273]);
  box(gantry, [0.14, 0.32, 0.3], [-1.65, -0.18, -0.36], dark, 0.025);
  box(gantry, [0.48, 0.075, 0.37], [-1.72, -0.36, -0.32], dark, 0.025);
  box(gantry, [0.2, 0.055, 0.2], [-1.78, -0.31, -0.27], silver, 0.015);

  const head = new THREE.Group();
  gantry.add(head);
  box(head, [0.56, 0.79, 0.52], [0, -0.04, -0.1], ivory, 0.065);
  box(head, [0.42, 0.14, 0.32], [0, 0.4, -0.1], silver, 0.025);
  const ports = [-0.135, -0.045, 0.045, 0.135];
  for (const x of ports) cylinder(head, 0.028, 0.1, [x, 0.51, -0.1], dark);
  // A separate strain relief joins the power cable to the toolhead housing.
  const powerInlet = new THREE.Vector3(-0.22, 0.5, -0.1);
  box(head, [0.11, 0.16, 0.14], [-0.22, 0.34, -0.1], dark, 0.02);
  cylinder(head, 0.04, 0.16, [-0.22, 0.44, -0.1], black);
  const powerOutlet = new THREE.Vector3(1.55, 0.45, -0.64);
  cylinder(printer, 0.065, 0.18, [1.55, 0.4, -0.64], black);
  printer.updateWorldMatrix(true, false);
  printer.localToWorld(powerOutlet);
  const fan = cylinder(head, 0.12, 0.025, [0, 0.04, 0.172], black);
  fan.rotation.x = Math.PI / 2;
  mesh(
    new THREE.TorusGeometry(0.093, 0.012, 6, 24),
    feederYellow,
    head,
    [0, 0.04, 0.19],
  );
  for (let i = 0; i < 7; i++) {
    const a = (i * Math.PI * 2) / 7;
    rod(
      head,
      new THREE.Vector3(Math.cos(a) * 0.035, 0.04 + Math.sin(a) * 0.035, 0.2),
      new THREE.Vector3(Math.cos(a) * 0.09, 0.04 + Math.sin(a) * 0.09, 0.2),
      0.011,
      dark,
    );
  }
  label(
    "Bambu Lab",
    0.36,
    0.075,
    "#535957",
    "#e9e7e1",
    head,
    [0, -0.22, 0.167],
  );
  box(head, [0.48, 0.12, 0.4], [0, -0.45, -0.08], dark, 0.03);
  cylinder(head, 0.025, 0.13, [0, -0.585, 0], brass, 0.08);

  // The A1 display is a low, upward-facing landscape screen on the base.
  const screen = new THREE.Group();
  // The bed reaches X = 1.285; the screen starts at X = 1.37,
  // keeping both the display and its mount outside the entire bed travel.
  screen.position.set(1.78, 0.57, 1.24);
  screen.rotation.x = -0.95;
  printer.add(screen);
  box(screen, [0.82, 0.51, 0.1], [0, 0, 0], dark, 0.035);
  const displayCanvas = document.createElement("canvas");
  displayCanvas.width = 384;
  displayCanvas.height = 224;
  const display = displayCanvas.getContext("2d")!;
  display.fillStyle = "#18232a";
  display.fillRect(0, 0, 384, 224);
  display.fillStyle = "#dbe3df";
  display.font = "18px Arial";
  display.fillText("Imprimindo", 22, 33);
  display.font = "bold 27px Arial";
  display.fillText("220°", 24, 90);
  display.fillText("60°", 215, 90);
  display.fillStyle = "#859995";
  display.fillRect(22, 111, 340, 3);
  for (let i = 0; i < 4; i++) {
    display.fillStyle = i === 0 ? "#76bca1" : "#3a4a50";
    display.fillRect(22 + i * 89, 140, 70, 58);
    display.fillStyle = "#e5ece7";
    display.fillRect(43 + i * 89, 156, 28, 4);
    display.fillRect(43 + i * 89, 169, 20, 4);
  }
  const displayTexture = new THREE.CanvasTexture(displayCanvas);
  displayTexture.colorSpace = THREE.SRGBColorSpace;
  textures.add(displayTexture);
  const displayMaterial = new THREE.MeshBasicMaterial({ map: displayTexture });
  materials.add(displayMaterial);
  mesh(
    new THREE.PlaneGeometry(0.72, 0.42),
    displayMaterial,
    screen,
    [0, 0, 0.056],
  );
  box(printer, [0.48, 0.22, 0.36], [1.65, 0.4, 1.16], ivory, 0.035);

  // AMS Lite: a broad curved shell, a central pedestal and opposed spool axles.
  const ams = new THREE.Group();
  ams.position.set(2.35, 0, -0.1);
  ams.rotation.y = -0.42;
  scene.add(ams);
  // Molded support: a tapered rear upright blends into two low, splayed toes.
  // Cross sections keep the feet flat on the table while softening the shoulders.
  const supportMaterial = material("#343633", { roughness: 0.78 });
  type SupportSection = [
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number,
  ];
  function supportPart(sections: SupportSection[], axis: "y" | "z") {
    const path = new THREE.CatmullRomCurve3(
      sections.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    );
    const sizes = new THREE.CatmullRomCurve3(
      sections.map(
        ([, , , width, depth]) => new THREE.Vector3(width, depth, 0),
      ),
    );
    const segments = 32,
      sides = 24;
    const positions: number[] = [];
    const indices: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const center = path.getPoint(t),
        size = sizes.getPoint(t);
      for (let j = 0; j < sides; j++) {
        const angle = (j * Math.PI * 2) / sides;
        const cos = Math.cos(angle),
          sin = Math.sin(angle);
        // Rounded rectangular sections, rather than circular tubes or square rails.
        const u = (Math.sign(cos) * Math.pow(Math.abs(cos), 0.35) * size.x) / 2;
        const v = (Math.sign(sin) * Math.pow(Math.abs(sin), 0.35) * size.y) / 2;
        positions.push(
          center.x + u,
          center.y + (axis === "z" ? v : 0),
          center.z + (axis === "y" ? -v : 0),
        );
      }
    }
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < sides; j++) {
        const a = i * sides + j,
          b = i * sides + ((j + 1) % sides);
        indices.push(a, b, a + sides, b, b + sides, a + sides);
      }
    }
    for (const end of [0, segments]) {
      const center = path.getPoint(end / segments);
      const index = positions.length / 3;
      positions.push(center.x, center.y, center.z);
      for (let j = 0; j < sides; j++) {
        const a = end * sides + j,
          b = end * sides + ((j + 1) % sides);
        if (end === 0) indices.push(index, b, a);
        else indices.push(index, a, b);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    mesh(geometry, supportMaterial, ams);
  }
  supportPart(
    [
      [0, -0.06, -0.68, 1.04, 0.62],
      [0, 0.08, -0.68, 1.02, 0.64],
      [0, 0.3, -0.7, 0.72, 0.48],
      [0, 0.7, -0.65, 0.51, 0.34],
      [0, 1.2, -0.57, 0.39, 0.27],
      [0, 1.65, -0.54, 0.33, 0.25],
      [0, 1.8, -0.56, 0.32, 0.24],
    ],
    "y",
  );
  for (const side of [-1, 1]) {
    supportPart(
      [
        [side * 0.2, 0.005, -0.96, 0.62, 0.17],
        [side * 0.32, 0.04, -0.55, 0.54, 0.24],
        [side * 0.43, 0.015, 0, 0.42, 0.19],
        [side * 0.56, -0.015, 0.65, 0.29, 0.13],
        [side * 0.7, -0.035, 1.25, 0.22, 0.09],
        [side * 0.71, -0.05, 1.4, 0.17, 0.06],
      ],
      "z",
    );
  }
  const shell = mesh(
    new THREE.CapsuleGeometry(0.53, 1.66, 8, 24),
    ivory,
    ams,
    [0, 1.55, -0.075],
  );
  shell.rotation.x = Math.atan2(-1.15, 1.2);
  shell.scale.x = 0.29;
  for (const side of [-1, 1]) {
    const screw = cylinder(
      ams,
      0.025,
      0.018,
      [side * 0.163, 1.52, 0.03],
      silver,
    );
    screw.rotation.z = Math.PI / 2;
  }

  // A shared perforation texture adds spool detail without hundreds of small meshes.
  const perforationCanvas = document.createElement("canvas");
  perforationCanvas.width = perforationCanvas.height = 512;
  const perforations = perforationCanvas.getContext("2d")!;
  perforations.fillStyle = "white";
  perforations.fillRect(0, 0, 512, 512);
  perforations.fillStyle = "black";
  for (let y = 18; y < 500; y += 12) {
    for (let x = 18; x < 500; x += 10) {
      const radius = Math.hypot(x - 256, y - 256);
      if (radius > 112 && radius < 242) perforations.fillRect(x, y, 5, 3);
    }
  }
  const perforationTexture = new THREE.CanvasTexture(perforationCanvas);
  textures.add(perforationTexture);
  const flangeMaterial = material("#cdd1cf", {
    alphaMap: perforationTexture,
    alphaTest: 0.5,
    side: THREE.DoubleSide,
    roughness: 0.65,
    metalness: 0.12,
  });
  const reels: THREE.Group[] = [];
  const spoolPositions: [number, number, number][] = [
    [-0.57, 0.95, 0.5],
    [0.57, 0.95, 0.5],
    [-0.57, 2.15, -0.65],
    [0.57, 2.15, -0.65],
  ];
  [red, white, lilac, dark].forEach((mat, i) => {
    const [x, y, z] = spoolPositions[i];
    const mount = new THREE.Group();
    mount.position.set(x, y, z);
    mount.rotation.y = Math.PI / 2;
    ams.add(mount);
    const spool = new THREE.Group();
    mount.add(spool);
    reels.push(spool);
    rod(
      ams,
      new THREE.Vector3(0, y, z),
      new THREE.Vector3(x, y, z),
      0.13,
      ivory,
    );
    const coil = cylinder(spool, 0.61, 0.5, [0, 0, 0], mat);
    coil.rotation.x = Math.PI / 2;
    for (let ring = 0; ring < 23; ring++) {
      const winding = mesh(
        new THREE.TorusGeometry(0.613, 0.006, 3, 48),
        mat,
        spool,
        [0, 0, -0.24 + ring * 0.022],
      );
      winding.castShadow = false;
    }
    for (const side of [-1, 1]) {
      const front = side * 0.28;
      mesh(new THREE.RingGeometry(0.19, 0.675, 64), flangeMaterial, spool, [
        0,
        0,
        front,
      ]);
      for (const radius of [0.23, 0.29, 0.665]) {
        const rim = mesh(
          new THREE.TorusGeometry(radius, radius > 0.6 ? 0.014 : 0.009, 6, 64),
          spoolShell,
          spool,
          [0, 0, front],
        );
        rim.castShadow = false;
      }
      const hub = cylinder(
        spool,
        0.155,
        0.17,
        [0, 0, front + side * 0.04],
        dark,
      );
      hub.rotation.x = Math.PI / 2;
      const spindle = cylinder(
        spool,
        0.085,
        0.2,
        [0, 0, front + side * 0.09],
        silver,
      );
      spindle.rotation.x = Math.PI / 2;
      for (let grip = 0; grip < 3; grip++) {
        const angle = (grip * Math.PI * 2) / 3;
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(
            Math.cos(angle) * 0.225,
            Math.sin(angle) * 0.225,
            front,
          ),
          new THREE.Vector3(
            Math.cos(angle) * 0.2,
            Math.sin(angle) * 0.2,
            front + side * 0.1,
          ),
          new THREE.Vector3(
            Math.cos(angle) * 0.12,
            Math.sin(angle) * 0.12,
            front + side * 0.17,
          ),
        ]);
        mesh(new THREE.TubeGeometry(curve, 8, 0.024, 6, false), ivory, spool);
      }
    }
  });

  // Two paired motor housings sit together at the top, with four feeder outlets.
  const feederOutlets: THREE.Vector3[] = [];
  const chamberMaterial = material("#777b69", {
    transparent: true,
    opacity: 0.7,
    roughness: 0.3,
  });
  const feederPairs: THREE.Group[] = [];
  for (const side of [-1, 1]) {
    const pair = new THREE.Group();
    pair.position.set(side * 0.33, 2.6, -0.28);
    pair.rotation.x = -0.28;
    ams.add(pair);
    feederPairs.push(pair);
    box(pair, [0.4, 0.54, 0.83], [0, 0, 0], dark, 0.15);
    for (const z of [-0.22, 0.22]) {
      cylinder(pair, 0.18, 0.035, [0, 0.285, z], dark);
      cylinder(pair, 0.15, 0.22, [0, -0.37, z], chamberMaterial);
    }
  }
  for (let i = 0; i < 4; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const pair = feederPairs[i % 2];
    const z = i < 2 ? 0.22 : -0.22;
    const capNumber = label(
      String(i + 1),
      0.16,
      0.12,
      "#999f9c",
      "#30383b",
      pair,
      [0, 0.305, z],
    );
    capNumber.rotation.x = -Math.PI / 2;
    const feeder = new THREE.Group();
    const front = i < 2 ? 1 : -1;
    // Outlets sit beyond the motor casing so the tubes enter exposed fittings.
    feeder.position.set(side * 0.05, -0.2, front * 0.56);
    feeder.rotation.y = i < 2 ? 0 : Math.PI;
    pair.add(feeder);
    box(
      pair,
      [0.16, 0.15, 0.25],
      [side * 0.05, -0.2, front * 0.43],
      dark,
      0.025,
    );
    cylinder(feeder, 0.115, 0.22, [0, -0.08, 0], chamberMaterial);
    cylinder(feeder, 0.12, 0.04, [0, 0.05, 0], dark);
    cylinder(feeder, 0.045, 0.095, [0, 0.115, 0], feederYellow);
    cylinder(feeder, 0.029, 0.035, [0, 0.175, 0], black);
    const release = cylinder(
      feeder,
      0.067,
      0.035,
      [0, -0.025, 0.13],
      feederYellow,
    );
    release.rotation.x = Math.PI / 2;
    feeder.updateWorldMatrix(true, false);
    feederOutlets.push(feeder.localToWorld(new THREE.Vector3(0, 0.19, 0)));
  }

  // Flexible PTFE tubes terminate directly at the four moving toolhead inlets.
  // Reuse vertex buffers each frame; no geometry allocation in the animation loop.
  const cableSpecs = [
    ...feederOutlets.map((start, index) => ({
      start,
      endLocal: new THREE.Vector3(ports[index], 0.55, -0.1),
      radius: 0.014,
      mat: tubeMaterial,
    })),
    {
      start: powerOutlet,
      endLocal: powerInlet,
      radius: 0.025,
      mat: dark,
    },
  ];
  const cableSegments = 40,
    cableSides = 6;
  const cables = cableSpecs.map((spec) => {
    const geometry = new THREE.BufferGeometry();
    geometries.add(geometry);
    const positions = new Float32Array((cableSegments + 1) * cableSides * 3);
    const normals = new Float32Array(positions.length);
    const indices: number[] = [];
    for (let i = 0; i < cableSegments; i++)
      for (let j = 0; j < cableSides; j++) {
        const a = i * cableSides + j,
          b = i * cableSides + ((j + 1) % cableSides);
        indices.push(a, b, a + cableSides, b, b + cableSides, a + cableSides);
      }
    geometry.setIndex(indices);
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage),
    );
    geometry.setAttribute(
      "normal",
      new THREE.BufferAttribute(normals, 3).setUsage(THREE.DynamicDrawUsage),
    );
    const cable = new THREE.Mesh(geometry, spec.mat);
    cable.frustumCulled = false;
    scene.add(cable);
    return { ...spec, geometry, positions, normals };
  });
  const end = new THREE.Vector3(),
    controlA = new THREE.Vector3(),
    controlB = new THREE.Vector3();
  const center = new THREE.Vector3(),
    tangent = new THREE.Vector3(),
    normal = new THREE.Vector3(),
    binormal = new THREE.Vector3();
  const referenceAxis = new THREE.Vector3(0, 0, 1);
  function updateCables() {
    head.updateWorldMatrix(true, false);
    cables.forEach((cable, index) => {
      head.localToWorld(end.copy(cable.endLocal));
      controlA
        .set(index === 4 ? 0.4 : -0.25, index === 4 ? 5.4 : 2.1, -0.15)
        .add(cable.start);
      controlB
        .set(index === 4 ? 0.3 : -0.45, 2.15 + index * 0.06, -0.28)
        .add(end);
      for (let i = 0; i <= cableSegments; i++) {
        const t = i / cableSegments,
          u = 1 - t;
        center
          .copy(cable.start)
          .multiplyScalar(u * u * u)
          .addScaledVector(controlA, 3 * u * u * t)
          .addScaledVector(controlB, 3 * u * t * t)
          .addScaledVector(end, t * t * t);
        tangent
          .copy(controlA)
          .sub(cable.start)
          .multiplyScalar(3 * u * u)
          .addScaledVector(controlB, 6 * u * t)
          .addScaledVector(controlA, -6 * u * t)
          .addScaledVector(end, 3 * t * t)
          .addScaledVector(controlB, -3 * t * t)
          .normalize();
        normal.crossVectors(tangent, referenceAxis).normalize();
        binormal.crossVectors(tangent, normal).normalize();
        for (let j = 0; j < cableSides; j++) {
          const angle = (j * Math.PI * 2) / cableSides,
            cos = Math.cos(angle),
            sin = Math.sin(angle);
          const n = (i * cableSides + j) * 3;
          for (let axis = 0; axis < 3; axis++) {
            const component =
              normal.getComponent(axis) * cos +
              binormal.getComponent(axis) * sin;
            cable.positions[n + axis] =
              center.getComponent(axis) + component * cable.radius;
            cable.normals[n + axis] = component;
          }
        }
      }
      cable.geometry.attributes.position.needsUpdate = true;
      cable.geometry.attributes.normal.needsUpdate = true;
    });
  }

  // Layer clipping reveals the actual full mushroom shape, rather than scaling it.
  const baseY = 0.61;
  const printPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), baseY);
  const printWhite = material("#fff6df", {
    transparent: true,
    clippingPlanes: [printPlane],
    clipShadows: true,
    side: THREE.DoubleSide,
  });
  const printRed = material("#d9342b", {
    transparent: true,
    clippingPlanes: [printPlane],
    clipShadows: true,
    side: THREE.DoubleSide,
    roughness: 0.48,
  });
  const mushroom = new THREE.Group();
  mushroom.position.set(0, baseY, 0.12);
  bed.add(mushroom);
  const stemProfile = [
    [0, 0],
    [0.3, 0],
    [0.36, 0.07],
    [0.38, 0.2],
    [0.35, 0.52],
    [0.3, 0.95],
    [0.35, 1.1],
    [0, 1.1],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  mesh(new THREE.LatheGeometry(stemProfile, 64), printWhite, mushroom);
  const capProfile = [
    [0, 1.03],
    [0.5, 1.03],
    [0.83, 1.07],
    [0.91, 1.16],
    [0.88, 1.34],
    [0.74, 1.56],
    [0.5, 1.73],
    [0.25, 1.82],
    [0, 1.85],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  const capCurve = new THREE.SplineCurve(capProfile);
  mesh(new THREE.LatheGeometry(capCurve.getPoints(48), 64), printRed, mushroom);
  // White spots follow the dome. Each is clipped by the same print plane.
  const spots = [
    [0.0, 0.0, 0.14],
    [-0.43, 0.22, 0.15],
    [0.39, 0.37, 0.17],
    [0.55, -0.27, 0.13],
    [-0.26, -0.57, 0.12],
    [0.04, 0.7, 0.14],
    [-0.69, -0.08, 0.11],
  ];
  for (const [x, z, r] of spots) {
    const radial = Math.hypot(x, z);
    const y = 1.17 + 0.68 * Math.sqrt(Math.max(0, 1 - (radial / 0.92) ** 2));
    const spot = mesh(
      new THREE.SphereGeometry(1, 24, 12),
      printWhite,
      mushroom,
      [x, y + 0.008, z],
    );
    spot.scale.set(r, 0.012, r);
    spot.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(x * 0.75, 1, z * 0.75).normalize(),
    );
  }
  // A flat current layer closes the clipped cross-section while printing.
  const layerWhite = material("#fff4dd", { roughness: 0.9 });
  const layerRed = material("#e04636", { roughness: 0.85 });
  const currentLayer = mesh(
    new THREE.CircleGeometry(1, 64),
    layerWhite,
    mushroom,
  );
  currentLayer.rotation.x = -Math.PI / 2;
  const filament = cylinder(head, 0.012, 0.045, [0, -0.665, 0], layerWhite);
  filament.castShadow = false;

  const finishedAt = 30;
  let elapsed = 19; // Start at a recognizable partly printed mushroom.
  let playing = true;
  let visible = true;
  let disposed = false;
  let frame = 0;
  let lastTime = 0;
  function radiusAt(height: number) {
    const profile = height < 1.05 ? stemProfile : capProfile;
    for (let i = 1; i < profile.length; i++) {
      const a = profile[i - 1],
        b = profile[i];
      if (b.y >= height && b.y > a.y)
        return THREE.MathUtils.lerp(a.x, b.x, (height - a.y) / (b.y - a.y));
    }
    return 0.02;
  }
  function update() {
    const progress = Math.min(elapsed / 29, 1);
    const h = Math.max(0.025, progress * 1.85);
    const printing = progress < 1;
    // Circular passes are linear in time; bed Y motion is shown as physical Z travel.
    const angle = elapsed * 3.6;
    const radius = radiusAt(h) * 0.88;
    const park = THREE.MathUtils.smoothstep(elapsed, 29, 29.8);
    const lastAngle = 29 * 3.6;
    const x = printing
      ? Math.cos(angle) * radius
      : THREE.MathUtils.lerp(Math.cos(lastAngle) * 0.018, 1.12, park);
    const z = printing
      ? Math.sin(angle) * radius
      : THREE.MathUtils.lerp(Math.sin(lastAngle) * 0.018, 0, park);
    bed.position.z = -z - 0.12;
    gantry.position.y = printing
      ? baseY + h + 0.65
      : baseY + 1.85 + 0.65 + park * 0.32;
    head.position.x = x;
    printPlane.constant = baseY + h;
    currentLayer.position.y = h - 0.001;
    currentLayer.scale.setScalar(Math.max(0.012, radiusAt(h)));
    currentLayer.material = h < 1.05 ? layerWhite : layerRed;
    currentLayer.visible = printing;
    filament.material = h < 1.05 ? layerWhite : layerRed;
    filament.visible = printing;
    for (let i = 0; i < reels.length; i++)
      reels[i].rotation.z =
        printing && i === (h < 1.05 ? 1 : 0) ? elapsed * 0.22 : 0;
    updateCables();
  }
  function draw() {
    update();
    renderer.render(scene, camera);
  }
  function tick(now: number) {
    frame = 0;
    if (
      disposed ||
      !playing ||
      !visible ||
      document.hidden ||
      elapsed >= finishedAt
    ) {
      lastTime = 0;
      return;
    }
    if (lastTime)
      elapsed = Math.min(
        finishedAt,
        elapsed + Math.min((now - lastTime) / 1000, 0.06),
      );
    lastTime = now;
    draw();
    if (elapsed < finishedAt) frame = requestAnimationFrame(tick);
  }
  function sync() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    if (
      !disposed &&
      playing &&
      visible &&
      !document.hidden &&
      elapsed < finishedAt
    )
      frame = requestAnimationFrame(tick);
  }
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height || disposed) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position
      .set(5.4, 4.8, 13.4)
      .multiplyScalar(camera.aspect < 1 ? 1.02 : 0.88);
    camera.lookAt(0.35, 1.9, 0);
    camera.updateProjectionMatrix();
    draw();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const intersection = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      sync();
    },
    { threshold: 0.05 },
  );
  intersection.observe(host);
  document.addEventListener("visibilitychange", sync);
  resize();
  sync();
  return {
    setPlaying(value) {
      playing = value;
      sync();
    },
    showFinished() {
      elapsed = finishedAt;
      sync();
      draw();
    },
    dispose() {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", sync);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
