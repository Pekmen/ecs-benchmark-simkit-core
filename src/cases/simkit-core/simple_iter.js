import { World, System, defineComponent } from "simkit-core";

export default async (count) => {
  const A = defineComponent("A", { value: 0 });
  const B = defineComponent("B", { value: 0 });
  const C = defineComponent("C", { value: 0 });
  const D = defineComponent("D", { value: 0 });
  const E = defineComponent("E", { value: 0 });

  class ABSystem extends System {
    constructor(world) {
      super(world);
      this.query = world.createQuery({ with: [A, B] });
    }

    update() {
      for (const entity of this.query.execute()) {
        const a = this.world.getComponent(entity, A);
        const b = this.world.getComponent(entity, B);
        if (a && b) {
          const temp = a.value;
          this.world.updateComponent(entity, A, () => ({ value: b.value }));
          this.world.updateComponent(entity, B, () => ({ value: temp }));
        }
      }
    }
  }

  class CDSystem extends System {
    constructor(world) {
      super(world);
      this.query = world.createQuery({ with: [C, D] });
    }

    update() {
      for (const entity of this.query.execute()) {
        const c = this.world.getComponent(entity, C);
        const d = this.world.getComponent(entity, D);
        if (c && d) {
          const temp = c.value;
          this.world.updateComponent(entity, C, () => ({ value: d.value }));
          this.world.updateComponent(entity, D, () => ({ value: temp }));
        }
      }
    }
  }

  class CESystem extends System {
    constructor(world) {
      super(world);
      this.query = world.createQuery({ with: [C, E] });
    }

    update() {
      for (const entity of this.query.execute()) {
        const c = this.world.getComponent(entity, C);
        const e = this.world.getComponent(entity, E);
        if (c && e) {
          const temp = c.value;
          this.world.updateComponent(entity, C, () => ({ value: e.value }));
          this.world.updateComponent(entity, E, () => ({ value: temp }));
        }
      }
    }
  }

  const world = new World();
  world.addSystem(new ABSystem(world));
  world.addSystem(new CDSystem(world));
  world.addSystem(new CESystem(world));

  // Create 1,000 entities of each type as described in the benchmark
  for (let i = 0; i < 1000; i++) {
    // 1,000 entities with (A, B)
    const entity1 = world.createEntity();
    world.addComponent(entity1, A, { value: 0 });
    world.addComponent(entity1, B, { value: 1 });

    // 1,000 entities with (A, B, C)
    const entity2 = world.createEntity();
    world.addComponent(entity2, A, { value: 0 });
    world.addComponent(entity2, B, { value: 1 });
    world.addComponent(entity2, C, { value: 2 });

    // 1,000 entities with (A, B, C, D)
    const entity3 = world.createEntity();
    world.addComponent(entity3, A, { value: 0 });
    world.addComponent(entity3, B, { value: 1 });
    world.addComponent(entity3, C, { value: 2 });
    world.addComponent(entity3, D, { value: 3 });

    // 1,000 entities with (A, B, C, E)
    const entity4 = world.createEntity();
    world.addComponent(entity4, A, { value: 0 });
    world.addComponent(entity4, B, { value: 1 });
    world.addComponent(entity4, C, { value: 2 });
    world.addComponent(entity4, E, { value: 4 });
  }

  return () => {
    world.update(16);
  };
};
