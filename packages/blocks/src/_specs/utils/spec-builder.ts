import type { BlockSpec } from '@blocksuite/block-std';
import type { Container } from '@blocksuite/global/di';

import { BlockSuiteError, ErrorCode } from '@blocksuite/global/exceptions';

export class SpecBuilder {
  private readonly _value: BlockSpec[];

  constructor(spec: BlockSpec[]) {
    this._value = [...spec];
  }

  setup<Flavour extends BlockSuite.ServiceKeys>(
    flavour: Flavour,
    setup: (di: Container) => void
  ) {
    const specIndex = this._value.findIndex(
      s => s.schema.model.flavour === flavour
    );

    if (specIndex === -1) {
      throw new BlockSuiteError(
        ErrorCode.ValueNotExists,
        `BlockSpec not found for ${flavour}`
      );
    }

    this._value[specIndex] = {
      ...this._value[specIndex],
    };

    const spec = this._value[specIndex];
    const oldSetup = spec.setup;

    spec.setup = di => {
      oldSetup?.(di);
      setup(di);
    };
  }

  get value() {
    return this._value;
  }
}
