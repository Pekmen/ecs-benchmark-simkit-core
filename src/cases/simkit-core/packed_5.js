import { World, System, defineComponent } from "simkit-core";

export default async (count) => {
  const A = defineComponent("A", { value: 0 });
  const B = defineComponent("B", { value: 0 });
  const C = defineComponent("C", { value: 0 });
  const D = defineComponent("D", { value: 0 });
  const E = defineComponent("E", { value: 0 });

  class ASystem extends System {
    update() {
      const entities = this.world.getAllEntities();
      for (const entity of entities) {
        if (this.world.hasComponent(entity, A)) {
          this.world.updateComponent(entity, A, (component) => ({
            value: component.value * 2,
          }));
        }
      }
    }
  }

  class BSystem extends System {
    update() {
      const entities = this.world.getAllEntities();
      for (const entity of entities) {
        if (this.world.hasComponent(entity, B)) {
          this.world.updateComponent(entity, B, (component) => ({
            value: component.value * 2,
          }));
        }
      }
    }
  }

  class CSystem extends System {
    update() {
      const entities = this.world.getAllEntities();
      for (const entity of entities) {
        if (this.world.hasComponent(entity, C)) {
          this.world.updateComponent(entity, C, (component) => ({
            value: component.value * 2,
          }));
        }
      }
    }
  }

  class DSystem extends System {
    update() {
      const entities = this.world.getAllEntities();
      for (const entity of entities) {
        if (this.world.hasComponent(entity, D)) {
          this.world.updateComponent(entity, D, (component) => ({
            value: component.value * 2,
          }));
        }
      }
    }
  }

  class ESystem extends System {
    update() {
      const entities = this.world.getAllEntities();
      for (const entity of entities) {
        if (this.world.hasComponent(entity, E)) {
          this.world.updateComponent(entity, E, (component) => ({
            value: component.value * 2,
          }));
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

  // Create entities with all components (initialize with value 1 so doubling has effect)
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
