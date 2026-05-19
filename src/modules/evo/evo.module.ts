import { ConfigModule } from "@nestjs/config";
import { evoConfig } from "./config";
import { Module } from "@nestjs/common";
import { EvoApiClient } from "./infra/evo-api.client";

@Module({
  imports: [
    ConfigModule.forFeature(evoConfig),
  ],
  providers: [EvoApiClient],
  exports: [EvoApiClient],
})
export class EvoModule {}