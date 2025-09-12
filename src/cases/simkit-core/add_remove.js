import { World, System, defineComponent } from "simkit-core";

export default async (count) => {
  const A = defineComponent("A", { value: 0 });
  const B = defineComponent("B", { value: 0 });

  class AddBSystem extends System {
    update() {
      const entities = this.world.getAllEntities();

      for (const entity of entities) {
        if (
          this.world.hasComponent(entity, A) &&
          !this.world.hasComponent(entity, B)
        ) {
          this.world.addComponent(entity, B, { value: 0 });
        }
      }
    }
  }

  class RemoveBSystem extends System {
    update() {
      const entities = this.world.getAllEntities();
      const entitiesToUpdate = [];

      for (const entity of entities) {
        if (this.world.hasComponent(entity, B)) {
          entitiesToUpdate.push(entity);
        }
      }

      for (const entity of entitiesToUpdate) {
        this.world.removeComponent(entity, B);
      }
    }
  }

  const world = new World();
  world.addSystem(new AddBSystem(world));
  world.addSystem(new RemoveBSystem(world));

  // Create entities with A component
  for (let i = 0; i < count; i++) {
    const entity = world.createEntity();
    world.addComponent(entity, A, { value: i });
  }

  return () => {
    world.update(16);
  };
};
