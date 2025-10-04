import { World, System, defineComponent } from "simkit-core";

export default async (count) => {
  const A = defineComponent("A", { value: 0 });
  const B = defineComponent("B", { value: 0 });
  const C = defineComponent("C", { value: 0 });
  const D = defineComponent("D", { value: 0 });
  const E = defineComponent("E", { value: 0 });

  class ASystem extends System {
    constructor(world) {
      super(world);
      this.query = world.createQuery({ with: [A] });
    }

    update() {
      const entities = this.query.execute();
      for (const entity of entities) {
        const component = this.world.getComponent(entity, A);
        if (component) {
          component.value = component.value * 2;
        }
      }
    }
  }

  class BSystem extends System {
    constructor(world) {
      super(world);
      this.query = world.createQuery({ with: [B] });
    }

    update() {
      const entities = this.query.execute();
      for (const entity of entities) {
        const component = this.world.getComponent(entity, B);
        if (component) {
          component.value = component.value * 2;
        }
      }
    }
  }

  class CSystem extends System {
    constructor(world) {
      super(world);
      this.query = world.createQuery({ with: [C] });
    }

    update() {
      const entities = this.query.execute();
      for (const entity of entities) {
        const component = this.world.getComponent(entity, C);
        if (component) {
          component.value = component.value * 2;
        }
      }
    }
  }

  class DSystem extends System {
    constructor(world) {
      super(world);
      this.query = world.createQuery({ with: [D] });
    }

    update() {
      const entities = this.query.execute();
      for (const entity of entities) {
        const component = this.world.getComponent(entity, D);
        if (component) {
          component.value = component.value * 2;
        }
      }
    }
  }

  class ESystem extends System {
    constructor(world) {
      super(world);
      this.query = world.createQuery({ with: [E] });
    }

    update() {
      const entities = this.query.execute();
      for (const entity of entities) {
        const component = this.world.getComponent(entity, E);
        if (component) {
          component.value = component.value * 2;
        }
      }
    }
  }

  const world = new World();
  world.addSystem(new ASystem(world));
  world.addSystem(new BSystem(world));
  world.addSystem(new CSystem(world));
  world.addSystem(new DSystem(world));
  world.addSystem(new ESystem(world));

  for (let i = 0; i < count; i++) {
    const entity = world.createEntity();
    world.addComponent(entity, A, { value: 1 });
    world.addComponent(entity, B, { value: 1 });
    world.addComponent(entity, C, { value: 1 });
    world.addComponent(entity, D, { value: 1 });
    world.addComponent(entity, E, { value: 1 });
  }

  return () => {
    world.update(16);
  };
};
