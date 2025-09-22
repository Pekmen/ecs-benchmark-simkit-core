import { World, System, defineComponent } from "simkit-core";

export default async (count) => {
  const A = defineComponent("A", { value: 0 });
  const B = defineComponent("B", { value: 0 });

  class SpawnBSystem extends System {
    constructor(world) {
      super(world);
      this.query = world.createQuery({ with: [A] });
    }

    update() {
      const entities = this.query.execute();
      for (const entity of entities) {
        const aComponent = this.world.getComponent(entity, A);
        if (aComponent) {
          const newEntity = this.world.createEntity();
          this.world.addComponent(newEntity, B, { value: aComponent.value });
        }
      }
    }
  }

  class DestroyBSystem extends System {
    constructor(world) {
      super(world);
      this.query = world.createQuery({ with: [B] });
    }

    update() {
      const entities = this.query.execute();
      const entitiesToDestroy = [];

      for (const entity of entities) {
        entitiesToDestroy.push(entity);
      }

      for (const entity of entitiesToDestroy) {
        this.world.destroyEntity(entity);
      }
    }
  }

  const world = new World();
  world.addSystem(new SpawnBSystem(world));
  world.addSystem(new DestroyBSystem(world));

  for (let i = 0; i < count; i++) {
    const entity = world.createEntity();
    world.addComponent(entity, A, { value: i });
  }

  return () => {
    world.update(16);
  };
};
