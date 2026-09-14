import { UuidValidationError } from "@/errors/UuidValidationError.js";
import { v7, validate, version } from 'uuid'

export class UUID {
  private constructor(
    private readonly value: string,
  ) {}

  static create(value: unknown): UUID {
    if (!(typeof value === "string" && validate(value) && version(value) === 7)) {
      throw new UuidValidationError(value);
    }

    return new UUID(value);
  }

  toString(): string {
    return this.value;
  }
}
