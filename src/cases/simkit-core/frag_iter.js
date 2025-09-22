import { World, System, defineComponent } from "simkit-core";

export default async (count) => {
  // Create 26 component types (A through Z)
  const components = [];
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i); // A = 65
    components.push(defineComponent(letter, { value: 0 }));
  }

  const Data = defineComponent("Data", { value: 0 });
  const Z = components[25]; // Z component

  class DataSystem extends System {
    constructor(world) {
      super(world);
      this.query = world.createQuery({ all: [Data] });
    }

    update() {
      for (const entity of this.query.entities) {
        this.world.updateComponent(entity, Data, (component) => ({
          value: component.value * 2,
        }));
      }
    }
  }

  class ZSystem extends System {
    constructor(world) {
      super(world);
      this.query = world.createQuery({ all: [Z] });
    }

    update() {
      for (const entity of this.query.entities) {
        this.world.updateComponent(entity, Z, (component) => ({
          value: component.value * 2,
        }));
      }
    }
  }

  const world = new World();
  world.addSystem(new DataSystem(world));
  world.addSystem(new ZSystem(world));

  // Create entities: count entities for each component type, each with Data component
  for (let i = 0; i < count; i++) {
    for (const Component of components) {
      const entity = world.createEntity();
      world.addComponent(entity, Component, { value: 1 });
      world.addComponent(entity, Data, { value: 1 });
    }
  }

  return () => {
    world.update(16);
  };
};
