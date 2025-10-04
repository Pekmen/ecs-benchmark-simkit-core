import { World, System, defineComponent } from "simkit-core";

export default async (count) => {
  const components = [];
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    components.push(defineComponent(letter, { value: 0 }));
  }

  const Data = defineComponent("Data", { value: 0 });
  const Z = components[25];

  class DataSystem extends System {
    constructor(world) {
      super(world);
      this.query = world.createQuery({ with: [Data] });
    }

    update() {
      const entities = this.query.execute();
      for (const entity of entities) {
        const component = this.world.getComponent(entity, Data);
        if (component) {
          component.value = component.value * 2;
        }
      }
    }
  }

  class ZSystem extends System {
    constructor(world) {
      super(world);
      this.query = world.createQuery({ with: [Z] });
    }

    update() {
      const entities = this.query.execute();
      for (const entity of entities) {
        const component = this.world.getComponent(entity, Z);
        if (component) {
          component.value = component.value * 2;
        }
      }
    }
  }

  const world = new World();
  world.addSystem(new DataSystem(world));
  world.addSystem(new ZSystem(world));

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
