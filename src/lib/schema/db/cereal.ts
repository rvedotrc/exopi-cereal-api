/* eslint-disable @typescript-eslint/no-explicit-any */

import { Column, Entity, PrimaryColumn } from "typeorm";

import type { CerealType } from "./cerealType";
import type { MfrCode } from "./mfrCode";

@Entity({ name: "cereals" })
export class Cereal {
  @PrimaryColumn({
    nullable: false,
    type: String,
  })
  id: string = undefined as any;

  @Column({ nullable: false, type: String }) name: string = undefined as any;
  @Column({ nullable: false, type: String }) mfr: MfrCode = undefined as any;
  @Column({ nullable: false, type: String }) type: CerealType =
    undefined as any;

  @Column({ nullable: false, type: Number }) calories: number =
    undefined as any;
  @Column({ nullable: false, type: Number }) protein: number = undefined as any;
  @Column({ nullable: false, type: Number }) fat: number = undefined as any;
  @Column({ nullable: false, type: Number }) sodium: number = undefined as any;
  @Column({ nullable: false, type: Number }) fiber: number = undefined as any;
  @Column({ nullable: false, type: Number }) carbo: number = undefined as any;
  @Column({ nullable: false, type: Number }) sugars: number = undefined as any;
  @Column({ nullable: false, type: Number }) potass: number = undefined as any;
  @Column({ nullable: false, type: Number }) vitamins: number =
    undefined as any;
  @Column({ nullable: false, type: Number }) shelf: number = undefined as any;
  @Column({ nullable: false, type: Number }) weight: number = undefined as any;
  @Column({ nullable: false, type: Number }) cups: number = undefined as any;
  @Column({ nullable: false, type: Number }) rating: number = undefined as any;
}
