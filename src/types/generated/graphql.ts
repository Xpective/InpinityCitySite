/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigDecimal: { input: string; output: string };
  BigInt: { input: string; output: string };
  Bytes: { input: string; output: string };
  /** 8 bytes signed integer */
  Int8: { input: string; output: string };
  /** A string representation of microseconds UNIX timestamp (16 digits) */
  Timestamp: { input: string; output: string };
};

export type AetherUse = {
  __typename?: "AetherUse";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  plot: Plot;
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
  user: Scalars["Bytes"]["output"];
  x: Scalars["Int"]["output"];
  y: Scalars["Int"]["output"];
};

export type AetherUseRecordedEvent = {
  __typename?: "AetherUseRecordedEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  plot: Plot;
  timestamp: Scalars["BigInt"]["output"];
  totalAetherUses: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type AetherUseRecordedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AetherUseRecordedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<AetherUseRecordedEvent_Filter>>>;
  plot?: InputMaybe<Scalars["String"]["input"]>;
  plot_?: InputMaybe<Plot_Filter>;
  plot_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_gt?: InputMaybe<Scalars["String"]["input"]>;
  plot_gte?: InputMaybe<Scalars["String"]["input"]>;
  plot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_lt?: InputMaybe<Scalars["String"]["input"]>;
  plot_lte?: InputMaybe<Scalars["String"]["input"]>;
  plot_not?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAetherUses?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAetherUses_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAetherUses_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAetherUses_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalAetherUses_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAetherUses_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAetherUses_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalAetherUses_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum AetherUseRecordedEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  plot = "plot",
  plot__createdAt = "plot__createdAt",
  plot__exists = "plot__exists",
  plot__faction = "plot__faction",
  plot__height = "plot__height",
  plot__id = "plot__id",
  plot__plotId = "plot__plotId",
  plot__plotType = "plot__plotType",
  plot__status = "plot__status",
  plot__width = "plot__width",
  timestamp = "timestamp",
  totalAetherUses = "totalAetherUses",
  txHash = "txHash",
}

export type AetherUse_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AetherUse_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<AetherUse_Filter>>>;
  plot?: InputMaybe<Scalars["String"]["input"]>;
  plot_?: InputMaybe<Plot_Filter>;
  plot_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_gt?: InputMaybe<Scalars["String"]["input"]>;
  plot_gte?: InputMaybe<Scalars["String"]["input"]>;
  plot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_lt?: InputMaybe<Scalars["String"]["input"]>;
  plot_lte?: InputMaybe<Scalars["String"]["input"]>;
  plot_not?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  user?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  user_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  x?: InputMaybe<Scalars["Int"]["input"]>;
  x_gt?: InputMaybe<Scalars["Int"]["input"]>;
  x_gte?: InputMaybe<Scalars["Int"]["input"]>;
  x_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  x_lt?: InputMaybe<Scalars["Int"]["input"]>;
  x_lte?: InputMaybe<Scalars["Int"]["input"]>;
  x_not?: InputMaybe<Scalars["Int"]["input"]>;
  x_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  y?: InputMaybe<Scalars["Int"]["input"]>;
  y_gt?: InputMaybe<Scalars["Int"]["input"]>;
  y_gte?: InputMaybe<Scalars["Int"]["input"]>;
  y_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  y_lt?: InputMaybe<Scalars["Int"]["input"]>;
  y_lte?: InputMaybe<Scalars["Int"]["input"]>;
  y_not?: InputMaybe<Scalars["Int"]["input"]>;
  y_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
};

export enum AetherUse_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  plot = "plot",
  plot__createdAt = "plot__createdAt",
  plot__exists = "plot__exists",
  plot__faction = "plot__faction",
  plot__height = "plot__height",
  plot__id = "plot__id",
  plot__plotId = "plot__plotId",
  plot__plotType = "plot__plotType",
  plot__status = "plot__status",
  plot__width = "plot__width",
  timestamp = "timestamp",
  txHash = "txHash",
  user = "user",
  x = "x",
  y = "y",
}

/** Indicates whether the current, partially filled bucket should be included in the response. Defaults to `exclude` */
export enum Aggregation_Current {
  /** Exclude the current, partially filled bucket from the response */
  exclude = "exclude",
  /** Include the current, partially filled bucket in the response */
  include = "include",
}

export enum Aggregation_Interval {
  day = "day",
  hour = "hour",
}

export type ApprovalEvent = {
  __typename?: "ApprovalEvent";
  approved: Scalars["Bytes"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  owner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  tokenId: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type ApprovalEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ApprovalEvent_Filter>>>;
  approved?: InputMaybe<Scalars["Bytes"]["input"]>;
  approved_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  approved_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  approved_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  approved_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  approved_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  approved_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  approved_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  approved_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  approved_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ApprovalEvent_Filter>>>;
  owner?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tokenId?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tokenId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ApprovalEvent_OrderBy {
  approved = "approved",
  blockNumber = "blockNumber",
  id = "id",
  owner = "owner",
  timestamp = "timestamp",
  tokenId = "tokenId",
  txHash = "txHash",
}

export type ApprovalForAllEvent = {
  __typename?: "ApprovalForAllEvent";
  approved: Scalars["Boolean"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  operator: Scalars["Bytes"]["output"];
  owner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type ApprovalForAllEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ApprovalForAllEvent_Filter>>>;
  approved?: InputMaybe<Scalars["Boolean"]["input"]>;
  approved_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  approved_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  approved_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  operator?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  operator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ApprovalForAllEvent_Filter>>>;
  owner?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ApprovalForAllEvent_OrderBy {
  approved = "approved",
  blockNumber = "blockNumber",
  id = "id",
  operator = "operator",
  owner = "owner",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type AuthorizedCaller = {
  __typename?: "AuthorizedCaller";
  allowed: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type AuthorizedCaller_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowed?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowed_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<AuthorizedCaller_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<AuthorizedCaller_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum AuthorizedCaller_OrderBy {
  allowed = "allowed",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type AuthorizedMinter = {
  __typename?: "AuthorizedMinter";
  allowed: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type AuthorizedMinter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowed?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowed_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<AuthorizedMinter_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<AuthorizedMinter_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum AuthorizedMinter_OrderBy {
  allowed = "allowed",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type BaseUri = {
  __typename?: "BaseURI";
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
  uri: Scalars["String"]["output"];
};

export type BaseUri_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BaseUri_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<BaseUri_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  uri?: InputMaybe<Scalars["String"]["input"]>;
  uri_contains?: InputMaybe<Scalars["String"]["input"]>;
  uri_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  uri_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_gt?: InputMaybe<Scalars["String"]["input"]>;
  uri_gte?: InputMaybe<Scalars["String"]["input"]>;
  uri_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  uri_lt?: InputMaybe<Scalars["String"]["input"]>;
  uri_lte?: InputMaybe<Scalars["String"]["input"]>;
  uri_not?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  uri_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  uri_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum BaseUri_OrderBy {
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
  uri = "uri",
}

export type BlockChangedFilter = {
  number_gte: Scalars["Int"]["input"];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars["Bytes"]["input"]>;
  number?: InputMaybe<Scalars["Int"]["input"]>;
  number_gte?: InputMaybe<Scalars["Int"]["input"]>;
};

export type BlueprintApprovalForAllEvent = {
  __typename?: "BlueprintApprovalForAllEvent";
  account: Scalars["Bytes"]["output"];
  approved: Scalars["Boolean"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  operator: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type BlueprintApprovalForAllEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  account_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<BlueprintApprovalForAllEvent_Filter>>>;
  approved?: InputMaybe<Scalars["Boolean"]["input"]>;
  approved_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  approved_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  approved_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  operator?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  operator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<BlueprintApprovalForAllEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum BlueprintApprovalForAllEvent_OrderBy {
  account = "account",
  approved = "approved",
  blockNumber = "blockNumber",
  id = "id",
  operator = "operator",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type BlueprintAuthorizedConsumer = {
  __typename?: "BlueprintAuthorizedConsumer";
  allowed: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type BlueprintAuthorizedConsumer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowed?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowed_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<BlueprintAuthorizedConsumer_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<BlueprintAuthorizedConsumer_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum BlueprintAuthorizedConsumer_OrderBy {
  allowed = "allowed",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type BlueprintAuthorizedMinter = {
  __typename?: "BlueprintAuthorizedMinter";
  allowed: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type BlueprintAuthorizedMinter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowed?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowed_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<BlueprintAuthorizedMinter_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<BlueprintAuthorizedMinter_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum BlueprintAuthorizedMinter_OrderBy {
  allowed = "allowed",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type BlueprintBalance = {
  __typename?: "BlueprintBalance";
  account: Player;
  amount: Scalars["BigInt"]["output"];
  blueprint: BlueprintDefinition;
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type BlueprintBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars["String"]["input"]>;
  account_?: InputMaybe<Player_Filter>;
  account_contains?: InputMaybe<Scalars["String"]["input"]>;
  account_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  account_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_gt?: InputMaybe<Scalars["String"]["input"]>;
  account_gte?: InputMaybe<Scalars["String"]["input"]>;
  account_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  account_lt?: InputMaybe<Scalars["String"]["input"]>;
  account_lte?: InputMaybe<Scalars["String"]["input"]>;
  account_not?: InputMaybe<Scalars["String"]["input"]>;
  account_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  account_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  account_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  account_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  account_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  account_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<BlueprintBalance_Filter>>>;
  blueprint?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_?: InputMaybe<BlueprintDefinition_Filter>;
  blueprint_contains?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_gt?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_gte?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  blueprint_lt?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_lte?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  blueprint_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<BlueprintBalance_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum BlueprintBalance_OrderBy {
  account = "account",
  account__cityKeyTokenId = "account__cityKeyTokenId",
  account__faction = "account__faction",
  account__id = "account__id",
  account__personalPlotCount = "account__personalPlotCount",
  amount = "amount",
  blueprint = "blueprint",
  blueprint__blueprintId = "blueprint__blueprintId",
  blueprint__districtLock = "blueprint__districtLock",
  blueprint__enabled = "blueprint__enabled",
  blueprint__factionLock = "blueprint__factionLock",
  blueprint__id = "blueprint__id",
  blueprint__name = "blueprint__name",
  blueprint__rarityTier = "blueprint__rarityTier",
  blueprint__techTier = "blueprint__techTier",
  blueprint__updatedAtBlock = "blueprint__updatedAtBlock",
  blueprint__updatedAtTimestamp = "blueprint__updatedAtTimestamp",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type BlueprintBaseMetadataUri = {
  __typename?: "BlueprintBaseMetadataURI";
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
  uri: Scalars["String"]["output"];
};

export type BlueprintBaseMetadataUri_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BlueprintBaseMetadataUri_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<BlueprintBaseMetadataUri_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  uri?: InputMaybe<Scalars["String"]["input"]>;
  uri_contains?: InputMaybe<Scalars["String"]["input"]>;
  uri_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  uri_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_gt?: InputMaybe<Scalars["String"]["input"]>;
  uri_gte?: InputMaybe<Scalars["String"]["input"]>;
  uri_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  uri_lt?: InputMaybe<Scalars["String"]["input"]>;
  uri_lte?: InputMaybe<Scalars["String"]["input"]>;
  uri_not?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  uri_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  uri_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum BlueprintBaseMetadataUri_OrderBy {
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
  uri = "uri",
}

export type BlueprintBurnEvent = {
  __typename?: "BlueprintBurnEvent";
  amount: Scalars["BigInt"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  blueprint: BlueprintDefinition;
  from: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type BlueprintBurnEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<BlueprintBurnEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blueprint?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_?: InputMaybe<BlueprintDefinition_Filter>;
  blueprint_contains?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_gt?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_gte?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  blueprint_lt?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_lte?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  blueprint_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  from?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<BlueprintBurnEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum BlueprintBurnEvent_OrderBy {
  amount = "amount",
  blockNumber = "blockNumber",
  blueprint = "blueprint",
  blueprint__blueprintId = "blueprint__blueprintId",
  blueprint__districtLock = "blueprint__districtLock",
  blueprint__enabled = "blueprint__enabled",
  blueprint__factionLock = "blueprint__factionLock",
  blueprint__id = "blueprint__id",
  blueprint__name = "blueprint__name",
  blueprint__rarityTier = "blueprint__rarityTier",
  blueprint__techTier = "blueprint__techTier",
  blueprint__updatedAtBlock = "blueprint__updatedAtBlock",
  blueprint__updatedAtTimestamp = "blueprint__updatedAtTimestamp",
  from = "from",
  id = "id",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type BlueprintDefinition = {
  __typename?: "BlueprintDefinition";
  blueprintId: Scalars["BigInt"]["output"];
  districtLock: Scalars["BigInt"]["output"];
  enabled: Scalars["Boolean"]["output"];
  factionLock: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  rarityTier: Scalars["BigInt"]["output"];
  techTier: Scalars["BigInt"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type BlueprintDefinition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BlueprintDefinition_Filter>>>;
  blueprintId?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blueprintId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  districtLock?: InputMaybe<Scalars["BigInt"]["input"]>;
  districtLock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  districtLock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  districtLock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  districtLock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  districtLock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  districtLock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  districtLock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  enabled_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  factionLock?: InputMaybe<Scalars["BigInt"]["input"]>;
  factionLock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  factionLock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  factionLock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  factionLock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  factionLock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  factionLock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  factionLock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_gt?: InputMaybe<Scalars["String"]["input"]>;
  name_gte?: InputMaybe<Scalars["String"]["input"]>;
  name_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_lt?: InputMaybe<Scalars["String"]["input"]>;
  name_lte?: InputMaybe<Scalars["String"]["input"]>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<BlueprintDefinition_Filter>>>;
  rarityTier?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rarityTier_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  techTier?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  techTier_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum BlueprintDefinition_OrderBy {
  blueprintId = "blueprintId",
  districtLock = "districtLock",
  enabled = "enabled",
  factionLock = "factionLock",
  id = "id",
  name = "name",
  rarityTier = "rarityTier",
  techTier = "techTier",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type BlueprintMintEvent = {
  __typename?: "BlueprintMintEvent";
  amount: Scalars["BigInt"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  blueprint: BlueprintDefinition;
  id: Scalars["ID"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  to: Scalars["Bytes"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type BlueprintMintEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<BlueprintMintEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blueprint?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_?: InputMaybe<BlueprintDefinition_Filter>;
  blueprint_contains?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_gt?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_gte?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  blueprint_lt?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_lte?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  blueprint_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  blueprint_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<BlueprintMintEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum BlueprintMintEvent_OrderBy {
  amount = "amount",
  blockNumber = "blockNumber",
  blueprint = "blueprint",
  blueprint__blueprintId = "blueprint__blueprintId",
  blueprint__districtLock = "blueprint__districtLock",
  blueprint__enabled = "blueprint__enabled",
  blueprint__factionLock = "blueprint__factionLock",
  blueprint__id = "blueprint__id",
  blueprint__name = "blueprint__name",
  blueprint__rarityTier = "blueprint__rarityTier",
  blueprint__techTier = "blueprint__techTier",
  blueprint__updatedAtBlock = "blueprint__updatedAtBlock",
  blueprint__updatedAtTimestamp = "blueprint__updatedAtTimestamp",
  id = "id",
  timestamp = "timestamp",
  to = "to",
  txHash = "txHash",
}

export type BlueprintTransferBatchEvent = {
  __typename?: "BlueprintTransferBatchEvent";
  blockNumber: Scalars["BigInt"]["output"];
  from: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  ids: Array<Scalars["BigInt"]["output"]>;
  operator: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  to: Scalars["Bytes"]["output"];
  txHash: Scalars["Bytes"]["output"];
  values: Array<Scalars["BigInt"]["output"]>;
};

export type BlueprintTransferBatchEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BlueprintTransferBatchEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  from?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  ids?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ids_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ids_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ids_not_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  operator?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  operator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<BlueprintTransferBatchEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  values?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_not_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum BlueprintTransferBatchEvent_OrderBy {
  blockNumber = "blockNumber",
  from = "from",
  id = "id",
  ids = "ids",
  operator = "operator",
  timestamp = "timestamp",
  to = "to",
  txHash = "txHash",
  values = "values",
}

export type BlueprintTransferSingleEvent = {
  __typename?: "BlueprintTransferSingleEvent";
  blockNumber: Scalars["BigInt"]["output"];
  blueprintId: Scalars["BigInt"]["output"];
  from: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  operator: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  to: Scalars["Bytes"]["output"];
  txHash: Scalars["Bytes"]["output"];
  value: Scalars["BigInt"]["output"];
};

export type BlueprintTransferSingleEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BlueprintTransferSingleEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blueprintId?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blueprintId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  from?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  operator?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  operator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<BlueprintTransferSingleEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  value?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  value_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum BlueprintTransferSingleEvent_OrderBy {
  blockNumber = "blockNumber",
  blueprintId = "blueprintId",
  from = "from",
  id = "id",
  operator = "operator",
  timestamp = "timestamp",
  to = "to",
  txHash = "txHash",
  value = "value",
}

export type BlueprintUriEvent = {
  __typename?: "BlueprintURIEvent";
  blockNumber: Scalars["BigInt"]["output"];
  blueprintId: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
  value: Scalars["String"]["output"];
};

export type BlueprintUriEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BlueprintUriEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blueprintId?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blueprintId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blueprintId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<BlueprintUriEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  value?: InputMaybe<Scalars["String"]["input"]>;
  value_contains?: InputMaybe<Scalars["String"]["input"]>;
  value_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  value_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_gt?: InputMaybe<Scalars["String"]["input"]>;
  value_gte?: InputMaybe<Scalars["String"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  value_lt?: InputMaybe<Scalars["String"]["input"]>;
  value_lte?: InputMaybe<Scalars["String"]["input"]>;
  value_not?: InputMaybe<Scalars["String"]["input"]>;
  value_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  value_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  value_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  value_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  value_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  value_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum BlueprintUriEvent_OrderBy {
  blockNumber = "blockNumber",
  blueprintId = "blueprintId",
  id = "id",
  timestamp = "timestamp",
  txHash = "txHash",
  value = "value",
}

export type CityBlueprints = {
  __typename?: "CityBlueprints";
  address: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type CityBlueprintsOwnershipTransferredEvent = {
  __typename?: "CityBlueprintsOwnershipTransferredEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newOwner: Scalars["Bytes"]["output"];
  previousOwner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type CityBlueprintsOwnershipTransferredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<
    Array<InputMaybe<CityBlueprintsOwnershipTransferredEvent_Filter>>
  >;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<
    Array<InputMaybe<CityBlueprintsOwnershipTransferredEvent_Filter>>
  >;
  previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum CityBlueprintsOwnershipTransferredEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newOwner = "newOwner",
  previousOwner = "previousOwner",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type CityBlueprints_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  address_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<CityBlueprints_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<CityBlueprints_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum CityBlueprints_OrderBy {
  address = "address",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type CityComponents = {
  __typename?: "CityComponents";
  address: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type CityComponentsOwnershipTransferredEvent = {
  __typename?: "CityComponentsOwnershipTransferredEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newOwner: Scalars["Bytes"]["output"];
  previousOwner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type CityComponentsOwnershipTransferredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<
    Array<InputMaybe<CityComponentsOwnershipTransferredEvent_Filter>>
  >;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<
    Array<InputMaybe<CityComponentsOwnershipTransferredEvent_Filter>>
  >;
  previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum CityComponentsOwnershipTransferredEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newOwner = "newOwner",
  previousOwner = "previousOwner",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type CityComponents_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  address_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<CityComponents_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<CityComponents_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum CityComponents_OrderBy {
  address = "address",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type CityConfigAddressEntry = {
  __typename?: "CityConfigAddressEntry";
  id: Scalars["ID"]["output"];
  key: Scalars["Bytes"]["output"];
  keyLabel?: Maybe<Scalars["String"]["output"]>;
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
  value: Scalars["Bytes"]["output"];
};

export type CityConfigAddressEntry_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CityConfigAddressEntry_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  key?: InputMaybe<Scalars["Bytes"]["input"]>;
  keyLabel?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_contains?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_gt?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_gte?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  keyLabel_lt?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_lte?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  keyLabel_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  key_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  key_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<CityConfigAddressEntry_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  value?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  value_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum CityConfigAddressEntry_OrderBy {
  id = "id",
  key = "key",
  keyLabel = "keyLabel",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
  value = "value",
}

export type CityConfigState = {
  __typename?: "CityConfigState";
  admin?: Maybe<Scalars["Bytes"]["output"]>;
  id: Scalars["ID"]["output"];
  initializedAtBlock?: Maybe<Scalars["BigInt"]["output"]>;
  initializedAtTimestamp?: Maybe<Scalars["BigInt"]["output"]>;
  owner?: Maybe<Scalars["Bytes"]["output"]>;
  updatedAtBlock?: Maybe<Scalars["BigInt"]["output"]>;
  updatedAtTimestamp?: Maybe<Scalars["BigInt"]["output"]>;
};

export type CityConfigState_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  admin?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  admin_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<CityConfigState_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  initializedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  initializedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  initializedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  initializedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  initializedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  initializedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  initializedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  initializedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  initializedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  initializedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  initializedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  initializedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  initializedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  initializedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  initializedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  initializedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<CityConfigState_Filter>>>;
  owner?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum CityConfigState_OrderBy {
  admin = "admin",
  id = "id",
  initializedAtBlock = "initializedAtBlock",
  initializedAtTimestamp = "initializedAtTimestamp",
  owner = "owner",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type CityConfigUintEntry = {
  __typename?: "CityConfigUintEntry";
  id: Scalars["ID"]["output"];
  key: Scalars["Bytes"]["output"];
  keyLabel?: Maybe<Scalars["String"]["output"]>;
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
  value: Scalars["BigInt"]["output"];
};

export type CityConfigUintEntry_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CityConfigUintEntry_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  key?: InputMaybe<Scalars["Bytes"]["input"]>;
  keyLabel?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_contains?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_gt?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_gte?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  keyLabel_lt?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_lte?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  keyLabel_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  key_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  key_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<CityConfigUintEntry_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  value?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  value_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum CityConfigUintEntry_OrderBy {
  id = "id",
  key = "key",
  keyLabel = "keyLabel",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
  value = "value",
}

export type CityDistrictsOwnershipTransferredEvent = {
  __typename?: "CityDistrictsOwnershipTransferredEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newOwner: Scalars["Bytes"]["output"];
  previousOwner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type CityDistrictsOwnershipTransferredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<
    Array<InputMaybe<CityDistrictsOwnershipTransferredEvent_Filter>>
  >;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<
    Array<InputMaybe<CityDistrictsOwnershipTransferredEvent_Filter>>
  >;
  previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum CityDistrictsOwnershipTransferredEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newOwner = "newOwner",
  previousOwner = "previousOwner",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type CityEnchantmentItemsOwnershipTransferredEvent = {
  __typename?: "CityEnchantmentItemsOwnershipTransferredEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newOwner: Scalars["Bytes"]["output"];
  previousOwner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type CityEnchantmentItemsOwnershipTransferredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<
    Array<InputMaybe<CityEnchantmentItemsOwnershipTransferredEvent_Filter>>
  >;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<
    Array<InputMaybe<CityEnchantmentItemsOwnershipTransferredEvent_Filter>>
  >;
  previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum CityEnchantmentItemsOwnershipTransferredEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newOwner = "newOwner",
  previousOwner = "previousOwner",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type CityEnchantmentsOwnershipTransferredEvent = {
  __typename?: "CityEnchantmentsOwnershipTransferredEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newOwner: Scalars["Bytes"]["output"];
  previousOwner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type CityEnchantmentsOwnershipTransferredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<
    Array<InputMaybe<CityEnchantmentsOwnershipTransferredEvent_Filter>>
  >;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<
    Array<InputMaybe<CityEnchantmentsOwnershipTransferredEvent_Filter>>
  >;
  previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum CityEnchantmentsOwnershipTransferredEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newOwner = "newOwner",
  previousOwner = "previousOwner",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type CityHistoryOwnershipTransferredEvent = {
  __typename?: "CityHistoryOwnershipTransferredEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newOwner: Scalars["Bytes"]["output"];
  previousOwner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type CityHistoryOwnershipTransferredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<
    Array<InputMaybe<CityHistoryOwnershipTransferredEvent_Filter>>
  >;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<
    Array<InputMaybe<CityHistoryOwnershipTransferredEvent_Filter>>
  >;
  previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum CityHistoryOwnershipTransferredEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newOwner = "newOwner",
  previousOwner = "previousOwner",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type CityMateriaItemsOwnershipTransferredEvent = {
  __typename?: "CityMateriaItemsOwnershipTransferredEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newOwner: Scalars["Bytes"]["output"];
  previousOwner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type CityMateriaItemsOwnershipTransferredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<
    Array<InputMaybe<CityMateriaItemsOwnershipTransferredEvent_Filter>>
  >;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<
    Array<InputMaybe<CityMateriaItemsOwnershipTransferredEvent_Filter>>
  >;
  previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum CityMateriaItemsOwnershipTransferredEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newOwner = "newOwner",
  previousOwner = "previousOwner",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type CityMateriaOwnershipTransferredEvent = {
  __typename?: "CityMateriaOwnershipTransferredEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newOwner: Scalars["Bytes"]["output"];
  previousOwner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type CityMateriaOwnershipTransferredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<
    Array<InputMaybe<CityMateriaOwnershipTransferredEvent_Filter>>
  >;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<
    Array<InputMaybe<CityMateriaOwnershipTransferredEvent_Filter>>
  >;
  previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum CityMateriaOwnershipTransferredEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newOwner = "newOwner",
  previousOwner = "previousOwner",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type CityStatusOwnershipTransferredEvent = {
  __typename?: "CityStatusOwnershipTransferredEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newOwner: Scalars["Bytes"]["output"];
  previousOwner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type CityStatusOwnershipTransferredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<
    Array<InputMaybe<CityStatusOwnershipTransferredEvent_Filter>>
  >;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<
    Array<InputMaybe<CityStatusOwnershipTransferredEvent_Filter>>
  >;
  previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum CityStatusOwnershipTransferredEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newOwner = "newOwner",
  previousOwner = "previousOwner",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type CityValidationOwnershipTransferredEvent = {
  __typename?: "CityValidationOwnershipTransferredEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newOwner: Scalars["Bytes"]["output"];
  previousOwner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type CityValidationOwnershipTransferredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<
    Array<InputMaybe<CityValidationOwnershipTransferredEvent_Filter>>
  >;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<
    Array<InputMaybe<CityValidationOwnershipTransferredEvent_Filter>>
  >;
  previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum CityValidationOwnershipTransferredEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newOwner = "newOwner",
  previousOwner = "previousOwner",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type CityWeaponsAddress = {
  __typename?: "CityWeaponsAddress";
  address: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type CityWeaponsAddress_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  address_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  address_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<CityWeaponsAddress_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<CityWeaponsAddress_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum CityWeaponsAddress_OrderBy {
  address = "address",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type ComponentApprovalForAllEvent = {
  __typename?: "ComponentApprovalForAllEvent";
  account: Scalars["Bytes"]["output"];
  approved: Scalars["Boolean"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  operator: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type ComponentApprovalForAllEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  account_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<ComponentApprovalForAllEvent_Filter>>>;
  approved?: InputMaybe<Scalars["Boolean"]["input"]>;
  approved_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  approved_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  approved_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  operator?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  operator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ComponentApprovalForAllEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ComponentApprovalForAllEvent_OrderBy {
  account = "account",
  approved = "approved",
  blockNumber = "blockNumber",
  id = "id",
  operator = "operator",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type ComponentAuthorizedConsumer = {
  __typename?: "ComponentAuthorizedConsumer";
  allowed: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type ComponentAuthorizedConsumer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowed?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowed_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<ComponentAuthorizedConsumer_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ComponentAuthorizedConsumer_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum ComponentAuthorizedConsumer_OrderBy {
  allowed = "allowed",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type ComponentAuthorizedMinter = {
  __typename?: "ComponentAuthorizedMinter";
  allowed: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type ComponentAuthorizedMinter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowed?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowed_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<ComponentAuthorizedMinter_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ComponentAuthorizedMinter_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum ComponentAuthorizedMinter_OrderBy {
  allowed = "allowed",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type ComponentBalance = {
  __typename?: "ComponentBalance";
  account: Player;
  amount: Scalars["BigInt"]["output"];
  component: ComponentDefinition;
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type ComponentBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars["String"]["input"]>;
  account_?: InputMaybe<Player_Filter>;
  account_contains?: InputMaybe<Scalars["String"]["input"]>;
  account_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  account_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_gt?: InputMaybe<Scalars["String"]["input"]>;
  account_gte?: InputMaybe<Scalars["String"]["input"]>;
  account_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  account_lt?: InputMaybe<Scalars["String"]["input"]>;
  account_lte?: InputMaybe<Scalars["String"]["input"]>;
  account_not?: InputMaybe<Scalars["String"]["input"]>;
  account_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  account_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  account_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  account_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  account_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  account_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  account_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<ComponentBalance_Filter>>>;
  component?: InputMaybe<Scalars["String"]["input"]>;
  component_?: InputMaybe<ComponentDefinition_Filter>;
  component_contains?: InputMaybe<Scalars["String"]["input"]>;
  component_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  component_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_gt?: InputMaybe<Scalars["String"]["input"]>;
  component_gte?: InputMaybe<Scalars["String"]["input"]>;
  component_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  component_lt?: InputMaybe<Scalars["String"]["input"]>;
  component_lte?: InputMaybe<Scalars["String"]["input"]>;
  component_not?: InputMaybe<Scalars["String"]["input"]>;
  component_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  component_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  component_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  component_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  component_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  component_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ComponentBalance_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum ComponentBalance_OrderBy {
  account = "account",
  account__cityKeyTokenId = "account__cityKeyTokenId",
  account__faction = "account__faction",
  account__id = "account__id",
  account__personalPlotCount = "account__personalPlotCount",
  amount = "amount",
  component = "component",
  component__category = "component__category",
  component__componentId = "component__componentId",
  component__enabled = "component__enabled",
  component__id = "component__id",
  component__name = "component__name",
  component__rarityTier = "component__rarityTier",
  component__techTier = "component__techTier",
  component__updatedAtBlock = "component__updatedAtBlock",
  component__updatedAtTimestamp = "component__updatedAtTimestamp",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type ComponentBaseMetadataUri = {
  __typename?: "ComponentBaseMetadataURI";
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
  uri: Scalars["String"]["output"];
};

export type ComponentBaseMetadataUri_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ComponentBaseMetadataUri_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ComponentBaseMetadataUri_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  uri?: InputMaybe<Scalars["String"]["input"]>;
  uri_contains?: InputMaybe<Scalars["String"]["input"]>;
  uri_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  uri_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_gt?: InputMaybe<Scalars["String"]["input"]>;
  uri_gte?: InputMaybe<Scalars["String"]["input"]>;
  uri_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  uri_lt?: InputMaybe<Scalars["String"]["input"]>;
  uri_lte?: InputMaybe<Scalars["String"]["input"]>;
  uri_not?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  uri_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  uri_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  uri_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum ComponentBaseMetadataUri_OrderBy {
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
  uri = "uri",
}

export type ComponentBurnEvent = {
  __typename?: "ComponentBurnEvent";
  amount: Scalars["BigInt"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  component: ComponentDefinition;
  from: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type ComponentBurnEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<ComponentBurnEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  component?: InputMaybe<Scalars["String"]["input"]>;
  component_?: InputMaybe<ComponentDefinition_Filter>;
  component_contains?: InputMaybe<Scalars["String"]["input"]>;
  component_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  component_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_gt?: InputMaybe<Scalars["String"]["input"]>;
  component_gte?: InputMaybe<Scalars["String"]["input"]>;
  component_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  component_lt?: InputMaybe<Scalars["String"]["input"]>;
  component_lte?: InputMaybe<Scalars["String"]["input"]>;
  component_not?: InputMaybe<Scalars["String"]["input"]>;
  component_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  component_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  component_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  component_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  component_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  component_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  from?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ComponentBurnEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ComponentBurnEvent_OrderBy {
  amount = "amount",
  blockNumber = "blockNumber",
  component = "component",
  component__category = "component__category",
  component__componentId = "component__componentId",
  component__enabled = "component__enabled",
  component__id = "component__id",
  component__name = "component__name",
  component__rarityTier = "component__rarityTier",
  component__techTier = "component__techTier",
  component__updatedAtBlock = "component__updatedAtBlock",
  component__updatedAtTimestamp = "component__updatedAtTimestamp",
  from = "from",
  id = "id",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type ComponentDefinition = {
  __typename?: "ComponentDefinition";
  category: Scalars["BigInt"]["output"];
  componentId: Scalars["BigInt"]["output"];
  enabled: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  rarityTier: Scalars["BigInt"]["output"];
  techTier: Scalars["BigInt"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type ComponentDefinition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ComponentDefinition_Filter>>>;
  category?: InputMaybe<Scalars["BigInt"]["input"]>;
  category_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  category_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  category_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  category_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  category_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  category_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  category_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  componentId?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  componentId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  enabled_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_gt?: InputMaybe<Scalars["String"]["input"]>;
  name_gte?: InputMaybe<Scalars["String"]["input"]>;
  name_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_lt?: InputMaybe<Scalars["String"]["input"]>;
  name_lte?: InputMaybe<Scalars["String"]["input"]>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<ComponentDefinition_Filter>>>;
  rarityTier?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rarityTier_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  techTier?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  techTier_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum ComponentDefinition_OrderBy {
  category = "category",
  componentId = "componentId",
  enabled = "enabled",
  id = "id",
  name = "name",
  rarityTier = "rarityTier",
  techTier = "techTier",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type ComponentMintEvent = {
  __typename?: "ComponentMintEvent";
  amount: Scalars["BigInt"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  component: ComponentDefinition;
  id: Scalars["ID"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  to: Scalars["Bytes"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type ComponentMintEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<ComponentMintEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  component?: InputMaybe<Scalars["String"]["input"]>;
  component_?: InputMaybe<ComponentDefinition_Filter>;
  component_contains?: InputMaybe<Scalars["String"]["input"]>;
  component_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  component_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_gt?: InputMaybe<Scalars["String"]["input"]>;
  component_gte?: InputMaybe<Scalars["String"]["input"]>;
  component_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  component_lt?: InputMaybe<Scalars["String"]["input"]>;
  component_lte?: InputMaybe<Scalars["String"]["input"]>;
  component_not?: InputMaybe<Scalars["String"]["input"]>;
  component_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  component_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  component_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  component_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  component_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  component_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  component_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ComponentMintEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ComponentMintEvent_OrderBy {
  amount = "amount",
  blockNumber = "blockNumber",
  component = "component",
  component__category = "component__category",
  component__componentId = "component__componentId",
  component__enabled = "component__enabled",
  component__id = "component__id",
  component__name = "component__name",
  component__rarityTier = "component__rarityTier",
  component__techTier = "component__techTier",
  component__updatedAtBlock = "component__updatedAtBlock",
  component__updatedAtTimestamp = "component__updatedAtTimestamp",
  id = "id",
  timestamp = "timestamp",
  to = "to",
  txHash = "txHash",
}

export type ComponentTransferBatchEvent = {
  __typename?: "ComponentTransferBatchEvent";
  blockNumber: Scalars["BigInt"]["output"];
  from: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  ids: Array<Scalars["BigInt"]["output"]>;
  operator: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  to: Scalars["Bytes"]["output"];
  txHash: Scalars["Bytes"]["output"];
  values: Array<Scalars["BigInt"]["output"]>;
};

export type ComponentTransferBatchEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ComponentTransferBatchEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  from?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  ids?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ids_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ids_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ids_not_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  operator?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  operator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ComponentTransferBatchEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  values?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_not_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum ComponentTransferBatchEvent_OrderBy {
  blockNumber = "blockNumber",
  from = "from",
  id = "id",
  ids = "ids",
  operator = "operator",
  timestamp = "timestamp",
  to = "to",
  txHash = "txHash",
  values = "values",
}

export type ComponentTransferSingleEvent = {
  __typename?: "ComponentTransferSingleEvent";
  blockNumber: Scalars["BigInt"]["output"];
  componentId: Scalars["BigInt"]["output"];
  from: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  operator: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  to: Scalars["Bytes"]["output"];
  txHash: Scalars["Bytes"]["output"];
  value: Scalars["BigInt"]["output"];
};

export type ComponentTransferSingleEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ComponentTransferSingleEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  componentId?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  componentId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  from?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  operator?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  operator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ComponentTransferSingleEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  value?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  value_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum ComponentTransferSingleEvent_OrderBy {
  blockNumber = "blockNumber",
  componentId = "componentId",
  from = "from",
  id = "id",
  operator = "operator",
  timestamp = "timestamp",
  to = "to",
  txHash = "txHash",
  value = "value",
}

export type ComponentUriEvent = {
  __typename?: "ComponentURIEvent";
  blockNumber: Scalars["BigInt"]["output"];
  componentId: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
  value: Scalars["String"]["output"];
};

export type ComponentUriEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ComponentUriEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  componentId?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  componentId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  componentId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ComponentUriEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  value?: InputMaybe<Scalars["String"]["input"]>;
  value_contains?: InputMaybe<Scalars["String"]["input"]>;
  value_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  value_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_gt?: InputMaybe<Scalars["String"]["input"]>;
  value_gte?: InputMaybe<Scalars["String"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  value_lt?: InputMaybe<Scalars["String"]["input"]>;
  value_lte?: InputMaybe<Scalars["String"]["input"]>;
  value_not?: InputMaybe<Scalars["String"]["input"]>;
  value_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  value_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  value_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  value_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  value_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  value_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum ComponentUriEvent_OrderBy {
  blockNumber = "blockNumber",
  componentId = "componentId",
  id = "id",
  timestamp = "timestamp",
  txHash = "txHash",
  value = "value",
}

export type ConfigInitializedEvent = {
  __typename?: "ConfigInitializedEvent";
  admin: Scalars["Bytes"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type ConfigInitializedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  admin?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  admin_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  admin_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<ConfigInitializedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ConfigInitializedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ConfigInitializedEvent_OrderBy {
  admin = "admin",
  blockNumber = "blockNumber",
  id = "id",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type ConfigOwnershipTransferredEvent = {
  __typename?: "ConfigOwnershipTransferredEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newOwner: Scalars["Bytes"]["output"];
  previousOwner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type ConfigOwnershipTransferredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ConfigOwnershipTransferredEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ConfigOwnershipTransferredEvent_Filter>>>;
  previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ConfigOwnershipTransferredEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newOwner = "newOwner",
  previousOwner = "previousOwner",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type CoreAddressSetEvent = {
  __typename?: "CoreAddressSetEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  key: Scalars["Bytes"]["output"];
  keyLabel?: Maybe<Scalars["String"]["output"]>;
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
  value: Scalars["Bytes"]["output"];
};

export type CoreAddressSetEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CoreAddressSetEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  key?: InputMaybe<Scalars["Bytes"]["input"]>;
  keyLabel?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_contains?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_gt?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_gte?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  keyLabel_lt?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_lte?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  keyLabel_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  key_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  key_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<CoreAddressSetEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  value?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  value_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum CoreAddressSetEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  key = "key",
  keyLabel = "keyLabel",
  timestamp = "timestamp",
  txHash = "txHash",
  value = "value",
}

export type CraftEvent = {
  __typename?: "CraftEvent";
  blockNumber: Scalars["BigInt"]["output"];
  craftNonce?: Maybe<Scalars["BigInt"]["output"]>;
  id: Scalars["ID"]["output"];
  outputAmount: Scalars["BigInt"]["output"];
  outputId: Scalars["BigInt"]["output"];
  outputKind: Scalars["Int"]["output"];
  recipeId: Scalars["BigInt"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  tokenId?: Maybe<Scalars["BigInt"]["output"]>;
  txHash: Scalars["Bytes"]["output"];
  user: Scalars["Bytes"]["output"];
  weaponDefinitionId?: Maybe<Scalars["BigInt"]["output"]>;
};

export type CraftEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CraftEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  craftNonce?: InputMaybe<Scalars["BigInt"]["input"]>;
  craftNonce_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  craftNonce_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  craftNonce_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  craftNonce_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  craftNonce_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  craftNonce_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  craftNonce_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<CraftEvent_Filter>>>;
  outputAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outputAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outputId?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outputId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outputKind?: InputMaybe<Scalars["Int"]["input"]>;
  outputKind_gt?: InputMaybe<Scalars["Int"]["input"]>;
  outputKind_gte?: InputMaybe<Scalars["Int"]["input"]>;
  outputKind_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  outputKind_lt?: InputMaybe<Scalars["Int"]["input"]>;
  outputKind_lte?: InputMaybe<Scalars["Int"]["input"]>;
  outputKind_not?: InputMaybe<Scalars["Int"]["input"]>;
  outputKind_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  recipeId?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  recipeId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tokenId?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tokenId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  user?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  user_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  weaponDefinitionId?: InputMaybe<Scalars["BigInt"]["input"]>;
  weaponDefinitionId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  weaponDefinitionId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  weaponDefinitionId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  weaponDefinitionId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  weaponDefinitionId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  weaponDefinitionId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  weaponDefinitionId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum CraftEvent_OrderBy {
  blockNumber = "blockNumber",
  craftNonce = "craftNonce",
  id = "id",
  outputAmount = "outputAmount",
  outputId = "outputId",
  outputKind = "outputKind",
  recipeId = "recipeId",
  timestamp = "timestamp",
  tokenId = "tokenId",
  txHash = "txHash",
  user = "user",
  weaponDefinitionId = "weaponDefinitionId",
}

export type CraftingOwnershipTransferredEvent = {
  __typename?: "CraftingOwnershipTransferredEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newOwner: Scalars["Bytes"]["output"];
  previousOwner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type CraftingOwnershipTransferredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CraftingOwnershipTransferredEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<CraftingOwnershipTransferredEvent_Filter>>>;
  previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum CraftingOwnershipTransferredEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newOwner = "newOwner",
  previousOwner = "previousOwner",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type CraftingPaused = {
  __typename?: "CraftingPaused";
  id: Scalars["ID"]["output"];
  paused: Scalars["Boolean"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type CraftingPaused_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CraftingPaused_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<CraftingPaused_Filter>>>;
  paused?: InputMaybe<Scalars["Boolean"]["input"]>;
  paused_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  paused_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  paused_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum CraftingPaused_OrderBy {
  id = "id",
  paused = "paused",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type DistrictAuthorizedCaller = {
  __typename?: "DistrictAuthorizedCaller";
  allowed: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type DistrictAuthorizedCaller_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowed?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowed_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<DistrictAuthorizedCaller_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<DistrictAuthorizedCaller_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum DistrictAuthorizedCaller_OrderBy {
  allowed = "allowed",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type EnchantmentAuthorizedCaller = {
  __typename?: "EnchantmentAuthorizedCaller";
  allowed: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type EnchantmentAuthorizedCaller_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowed?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowed_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<EnchantmentAuthorizedCaller_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<EnchantmentAuthorizedCaller_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum EnchantmentAuthorizedCaller_OrderBy {
  allowed = "allowed",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type EnchantmentBonusSet = {
  __typename?: "EnchantmentBonusSet";
  accuracyBpsBonus: Scalars["BigInt"]["output"];
  aoeRadiusBonus: Scalars["BigInt"]["output"];
  armorPenBpsBonus: Scalars["BigInt"]["output"];
  attackSpeedBonus: Scalars["BigInt"]["output"];
  blockChanceBpsBonus: Scalars["BigInt"]["output"];
  cooldownMsBonus: Scalars["BigInt"]["output"];
  critChanceBpsBonus: Scalars["BigInt"]["output"];
  critMultiplierBpsBonus: Scalars["BigInt"]["output"];
  enchantment: EnchantmentDefinition;
  enchantmentSlotsBonus: Scalars["BigInt"]["output"];
  energyCostBonus: Scalars["BigInt"]["output"];
  heatGenerationBonus: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  level: Scalars["BigInt"]["output"];
  lifeStealBpsBonus: Scalars["BigInt"]["output"];
  materiaSlotsBonus: Scalars["BigInt"]["output"];
  maxDamageBonus: Scalars["BigInt"]["output"];
  maxDurabilityBonus: Scalars["BigInt"]["output"];
  minDamageBonus: Scalars["BigInt"]["output"];
  projectileSpeedBonus: Scalars["BigInt"]["output"];
  rangeBonus: Scalars["BigInt"]["output"];
  stabilityBonus: Scalars["BigInt"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type EnchantmentBonusSet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accuracyBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  accuracyBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<EnchantmentBonusSet_Filter>>>;
  aoeRadiusBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  aoeRadiusBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  armorPenBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  armorPenBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  attackSpeedBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  attackSpeedBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockChanceBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockChanceBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  cooldownMsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  cooldownMsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critChanceBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critChanceBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critMultiplierBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critMultiplierBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  enchantment?: InputMaybe<Scalars["String"]["input"]>;
  enchantmentSlotsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  enchantmentSlotsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  enchantment_?: InputMaybe<EnchantmentDefinition_Filter>;
  enchantment_contains?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_gt?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_gte?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  enchantment_lt?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_lte?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_not?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  enchantment_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  enchantment_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  energyCostBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  energyCostBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  heatGenerationBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  heatGenerationBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  level?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  level_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lifeStealBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lifeStealBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  materiaSlotsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  materiaSlotsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDamageBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDamageBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDurabilityBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDurabilityBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  minDamageBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  minDamageBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<EnchantmentBonusSet_Filter>>>;
  projectileSpeedBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  projectileSpeedBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rangeBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rangeBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  stabilityBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  stabilityBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum EnchantmentBonusSet_OrderBy {
  accuracyBpsBonus = "accuracyBpsBonus",
  aoeRadiusBonus = "aoeRadiusBonus",
  armorPenBpsBonus = "armorPenBpsBonus",
  attackSpeedBonus = "attackSpeedBonus",
  blockChanceBpsBonus = "blockChanceBpsBonus",
  cooldownMsBonus = "cooldownMsBonus",
  critChanceBpsBonus = "critChanceBpsBonus",
  critMultiplierBpsBonus = "critMultiplierBpsBonus",
  enchantment = "enchantment",
  enchantmentSlotsBonus = "enchantmentSlotsBonus",
  enchantment__category = "enchantment__category",
  enchantment__enabled = "enchantment__enabled",
  enchantment__enchantmentId = "enchantment__enchantmentId",
  enchantment__id = "enchantment__id",
  enchantment__maxLevel = "enchantment__maxLevel",
  enchantment__name = "enchantment__name",
  enchantment__rarityTier = "enchantment__rarityTier",
  enchantment__updatedAtBlock = "enchantment__updatedAtBlock",
  enchantment__updatedAtTimestamp = "enchantment__updatedAtTimestamp",
  energyCostBonus = "energyCostBonus",
  heatGenerationBonus = "heatGenerationBonus",
  id = "id",
  level = "level",
  lifeStealBpsBonus = "lifeStealBpsBonus",
  materiaSlotsBonus = "materiaSlotsBonus",
  maxDamageBonus = "maxDamageBonus",
  maxDurabilityBonus = "maxDurabilityBonus",
  minDamageBonus = "minDamageBonus",
  projectileSpeedBonus = "projectileSpeedBonus",
  rangeBonus = "rangeBonus",
  stabilityBonus = "stabilityBonus",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type EnchantmentDefinition = {
  __typename?: "EnchantmentDefinition";
  category: Scalars["BigInt"]["output"];
  enabled: Scalars["Boolean"]["output"];
  enchantmentId: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  maxLevel: Scalars["BigInt"]["output"];
  name: Scalars["String"]["output"];
  rarityTier: Scalars["BigInt"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type EnchantmentDefinition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<EnchantmentDefinition_Filter>>>;
  category?: InputMaybe<Scalars["BigInt"]["input"]>;
  category_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  category_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  category_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  category_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  category_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  category_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  category_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  enabled_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  enchantmentId?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  enchantmentId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  maxLevel?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxLevel_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxLevel_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxLevel_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxLevel_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxLevel_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxLevel_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxLevel_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_gt?: InputMaybe<Scalars["String"]["input"]>;
  name_gte?: InputMaybe<Scalars["String"]["input"]>;
  name_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_lt?: InputMaybe<Scalars["String"]["input"]>;
  name_lte?: InputMaybe<Scalars["String"]["input"]>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<EnchantmentDefinition_Filter>>>;
  rarityTier?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rarityTier_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum EnchantmentDefinition_OrderBy {
  category = "category",
  enabled = "enabled",
  enchantmentId = "enchantmentId",
  id = "id",
  maxLevel = "maxLevel",
  name = "name",
  rarityTier = "rarityTier",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type EnchantmentItemApprovalForAllEvent = {
  __typename?: "EnchantmentItemApprovalForAllEvent";
  account: Scalars["Bytes"]["output"];
  approved: Scalars["Boolean"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  operator: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type EnchantmentItemApprovalForAllEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  account_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<
    Array<InputMaybe<EnchantmentItemApprovalForAllEvent_Filter>>
  >;
  approved?: InputMaybe<Scalars["Boolean"]["input"]>;
  approved_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  approved_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  approved_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  operator?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  operator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<EnchantmentItemApprovalForAllEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum EnchantmentItemApprovalForAllEvent_OrderBy {
  account = "account",
  approved = "approved",
  blockNumber = "blockNumber",
  id = "id",
  operator = "operator",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type EnchantmentItemAuthorizedConsumer = {
  __typename?: "EnchantmentItemAuthorizedConsumer";
  allowed: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type EnchantmentItemAuthorizedConsumer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowed?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowed_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<EnchantmentItemAuthorizedConsumer_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<EnchantmentItemAuthorizedConsumer_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum EnchantmentItemAuthorizedConsumer_OrderBy {
  allowed = "allowed",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type EnchantmentItemAuthorizedMinter = {
  __typename?: "EnchantmentItemAuthorizedMinter";
  allowed: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type EnchantmentItemAuthorizedMinter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowed?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowed_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<EnchantmentItemAuthorizedMinter_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<EnchantmentItemAuthorizedMinter_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum EnchantmentItemAuthorizedMinter_OrderBy {
  allowed = "allowed",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type EnchantmentItemBaseMetadataUriSetEvent = {
  __typename?: "EnchantmentItemBaseMetadataURISetEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newBaseMetadataURI: Scalars["String"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type EnchantmentItemBaseMetadataUriSetEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<
    Array<InputMaybe<EnchantmentItemBaseMetadataUriSetEvent_Filter>>
  >;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newBaseMetadataURI?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_contains?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_gt?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_gte?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  newBaseMetadataURI_lt?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_lte?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_not?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_not_contains_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  newBaseMetadataURI_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_not_ends_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  newBaseMetadataURI_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  newBaseMetadataURI_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  newBaseMetadataURI_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  or?: InputMaybe<
    Array<InputMaybe<EnchantmentItemBaseMetadataUriSetEvent_Filter>>
  >;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum EnchantmentItemBaseMetadataUriSetEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newBaseMetadataURI = "newBaseMetadataURI",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type EnchantmentItemBurnedEvent = {
  __typename?: "EnchantmentItemBurnedEvent";
  amount: Scalars["BigInt"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  from: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  itemId: Scalars["BigInt"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type EnchantmentItemBurnedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<EnchantmentItemBurnedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  from?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  itemId?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  itemId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<EnchantmentItemBurnedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum EnchantmentItemBurnedEvent_OrderBy {
  amount = "amount",
  blockNumber = "blockNumber",
  from = "from",
  id = "id",
  itemId = "itemId",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type EnchantmentItemDefinition = {
  __typename?: "EnchantmentItemDefinition";
  burnOnUse: Scalars["Boolean"]["output"];
  enabled: Scalars["Boolean"]["output"];
  enchantmentDefinitionId: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  itemId: Scalars["BigInt"]["output"];
  level: Scalars["BigInt"]["output"];
  rarityTier: Scalars["BigInt"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type EnchantmentItemDefinition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<EnchantmentItemDefinition_Filter>>>;
  burnOnUse?: InputMaybe<Scalars["Boolean"]["input"]>;
  burnOnUse_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  burnOnUse_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  burnOnUse_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  enabled_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  enchantmentDefinitionId?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentDefinitionId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentDefinitionId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentDefinitionId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  enchantmentDefinitionId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentDefinitionId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentDefinitionId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentDefinitionId_not_in?: InputMaybe<
    Array<Scalars["BigInt"]["input"]>
  >;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  itemId?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  itemId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  level?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  level_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<EnchantmentItemDefinition_Filter>>>;
  rarityTier?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rarityTier_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum EnchantmentItemDefinition_OrderBy {
  burnOnUse = "burnOnUse",
  enabled = "enabled",
  enchantmentDefinitionId = "enchantmentDefinitionId",
  id = "id",
  itemId = "itemId",
  level = "level",
  rarityTier = "rarityTier",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type EnchantmentItemMintedEvent = {
  __typename?: "EnchantmentItemMintedEvent";
  amount: Scalars["BigInt"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  itemId: Scalars["BigInt"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  to: Scalars["Bytes"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type EnchantmentItemMintedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<EnchantmentItemMintedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  itemId?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  itemId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<EnchantmentItemMintedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum EnchantmentItemMintedEvent_OrderBy {
  amount = "amount",
  blockNumber = "blockNumber",
  id = "id",
  itemId = "itemId",
  timestamp = "timestamp",
  to = "to",
  txHash = "txHash",
}

export type EnchantmentItemTransferBatchEvent = {
  __typename?: "EnchantmentItemTransferBatchEvent";
  blockNumber: Scalars["BigInt"]["output"];
  from: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  ids: Array<Scalars["BigInt"]["output"]>;
  operator: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  to: Scalars["Bytes"]["output"];
  txHash: Scalars["Bytes"]["output"];
  values: Array<Scalars["BigInt"]["output"]>;
};

export type EnchantmentItemTransferBatchEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<EnchantmentItemTransferBatchEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  from?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  ids?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ids_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ids_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ids_not_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  operator?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  operator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<EnchantmentItemTransferBatchEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  values?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_not_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum EnchantmentItemTransferBatchEvent_OrderBy {
  blockNumber = "blockNumber",
  from = "from",
  id = "id",
  ids = "ids",
  operator = "operator",
  timestamp = "timestamp",
  to = "to",
  txHash = "txHash",
  values = "values",
}

export type EnchantmentItemTransferSingleEvent = {
  __typename?: "EnchantmentItemTransferSingleEvent";
  blockNumber: Scalars["BigInt"]["output"];
  from: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  operator: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  to: Scalars["Bytes"]["output"];
  tokenId: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
  value: Scalars["BigInt"]["output"];
};

export type EnchantmentItemTransferSingleEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<
    Array<InputMaybe<EnchantmentItemTransferSingleEvent_Filter>>
  >;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  from?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  operator?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  operator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<EnchantmentItemTransferSingleEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  tokenId?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tokenId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  value?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  value_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum EnchantmentItemTransferSingleEvent_OrderBy {
  blockNumber = "blockNumber",
  from = "from",
  id = "id",
  operator = "operator",
  timestamp = "timestamp",
  to = "to",
  tokenId = "tokenId",
  txHash = "txHash",
  value = "value",
}

export type EnchantmentItemUriEvent = {
  __typename?: "EnchantmentItemURIEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  tokenId: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
  value: Scalars["String"]["output"];
};

export type EnchantmentItemUriEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<EnchantmentItemUriEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<EnchantmentItemUriEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tokenId?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tokenId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  value?: InputMaybe<Scalars["String"]["input"]>;
  value_contains?: InputMaybe<Scalars["String"]["input"]>;
  value_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  value_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_gt?: InputMaybe<Scalars["String"]["input"]>;
  value_gte?: InputMaybe<Scalars["String"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  value_lt?: InputMaybe<Scalars["String"]["input"]>;
  value_lte?: InputMaybe<Scalars["String"]["input"]>;
  value_not?: InputMaybe<Scalars["String"]["input"]>;
  value_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  value_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  value_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  value_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  value_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  value_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum EnchantmentItemUriEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  timestamp = "timestamp",
  tokenId = "tokenId",
  txHash = "txHash",
  value = "value",
}

export type LayerAddedEvent = {
  __typename?: "LayerAddedEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newLayerCount: Scalars["BigInt"]["output"];
  plot: Plot;
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type LayerAddedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LayerAddedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newLayerCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  newLayerCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  newLayerCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  newLayerCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  newLayerCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  newLayerCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  newLayerCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  newLayerCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<LayerAddedEvent_Filter>>>;
  plot?: InputMaybe<Scalars["String"]["input"]>;
  plot_?: InputMaybe<Plot_Filter>;
  plot_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_gt?: InputMaybe<Scalars["String"]["input"]>;
  plot_gte?: InputMaybe<Scalars["String"]["input"]>;
  plot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_lt?: InputMaybe<Scalars["String"]["input"]>;
  plot_lte?: InputMaybe<Scalars["String"]["input"]>;
  plot_not?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum LayerAddedEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newLayerCount = "newLayerCount",
  plot = "plot",
  plot__createdAt = "plot__createdAt",
  plot__exists = "plot__exists",
  plot__faction = "plot__faction",
  plot__height = "plot__height",
  plot__id = "plot__id",
  plot__plotId = "plot__plotId",
  plot__plotType = "plot__plotType",
  plot__status = "plot__status",
  plot__width = "plot__width",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type ManualStatusClearedEvent = {
  __typename?: "ManualStatusClearedEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  plot: Plot;
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type ManualStatusClearedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ManualStatusClearedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ManualStatusClearedEvent_Filter>>>;
  plot?: InputMaybe<Scalars["String"]["input"]>;
  plot_?: InputMaybe<Plot_Filter>;
  plot_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_gt?: InputMaybe<Scalars["String"]["input"]>;
  plot_gte?: InputMaybe<Scalars["String"]["input"]>;
  plot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_lt?: InputMaybe<Scalars["String"]["input"]>;
  plot_lte?: InputMaybe<Scalars["String"]["input"]>;
  plot_not?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum ManualStatusClearedEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  plot = "plot",
  plot__createdAt = "plot__createdAt",
  plot__exists = "plot__exists",
  plot__faction = "plot__faction",
  plot__height = "plot__height",
  plot__id = "plot__id",
  plot__plotId = "plot__plotId",
  plot__plotType = "plot__plotType",
  plot__status = "plot__status",
  plot__width = "plot__width",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type MateriaAuthorizedCaller = {
  __typename?: "MateriaAuthorizedCaller";
  allowed: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type MateriaAuthorizedCaller_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowed?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowed_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<MateriaAuthorizedCaller_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<MateriaAuthorizedCaller_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum MateriaAuthorizedCaller_OrderBy {
  allowed = "allowed",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type MateriaBonus = {
  __typename?: "MateriaBonus";
  accuracyBpsBonus: Scalars["BigInt"]["output"];
  aoeRadiusBonus: Scalars["BigInt"]["output"];
  armorPenBpsBonus: Scalars["BigInt"]["output"];
  attackSpeedBonus: Scalars["BigInt"]["output"];
  blockChanceBpsBonus: Scalars["BigInt"]["output"];
  cooldownMsBonus: Scalars["BigInt"]["output"];
  critChanceBpsBonus: Scalars["BigInt"]["output"];
  critMultiplierBpsBonus: Scalars["BigInt"]["output"];
  enchantmentSlotsBonus: Scalars["BigInt"]["output"];
  energyCostBonus: Scalars["BigInt"]["output"];
  heatGenerationBonus: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  level: Scalars["BigInt"]["output"];
  lifeStealBpsBonus: Scalars["BigInt"]["output"];
  materia: MateriaDefinition;
  materiaId: Scalars["BigInt"]["output"];
  materiaSlotsBonus: Scalars["BigInt"]["output"];
  maxDamageBonus: Scalars["BigInt"]["output"];
  maxDurabilityBonus: Scalars["BigInt"]["output"];
  minDamageBonus: Scalars["BigInt"]["output"];
  projectileSpeedBonus: Scalars["BigInt"]["output"];
  rangeBonus: Scalars["BigInt"]["output"];
  stabilityBonus: Scalars["BigInt"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type MateriaBonus_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accuracyBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  accuracyBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<MateriaBonus_Filter>>>;
  aoeRadiusBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  aoeRadiusBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  armorPenBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  armorPenBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  attackSpeedBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  attackSpeedBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockChanceBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockChanceBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  cooldownMsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  cooldownMsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critChanceBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critChanceBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critMultiplierBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critMultiplierBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  enchantmentSlotsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  enchantmentSlotsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  energyCostBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  energyCostBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  heatGenerationBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  heatGenerationBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  level?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  level_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lifeStealBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lifeStealBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  materia?: InputMaybe<Scalars["String"]["input"]>;
  materiaId?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  materiaId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  materiaSlotsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  materiaSlotsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  materia_?: InputMaybe<MateriaDefinition_Filter>;
  materia_contains?: InputMaybe<Scalars["String"]["input"]>;
  materia_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  materia_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  materia_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  materia_gt?: InputMaybe<Scalars["String"]["input"]>;
  materia_gte?: InputMaybe<Scalars["String"]["input"]>;
  materia_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  materia_lt?: InputMaybe<Scalars["String"]["input"]>;
  materia_lte?: InputMaybe<Scalars["String"]["input"]>;
  materia_not?: InputMaybe<Scalars["String"]["input"]>;
  materia_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  materia_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  materia_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  materia_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  materia_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  materia_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  materia_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  materia_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  materia_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  maxDamageBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDamageBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDurabilityBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDurabilityBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  minDamageBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  minDamageBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<MateriaBonus_Filter>>>;
  projectileSpeedBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  projectileSpeedBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rangeBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rangeBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  stabilityBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  stabilityBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum MateriaBonus_OrderBy {
  accuracyBpsBonus = "accuracyBpsBonus",
  aoeRadiusBonus = "aoeRadiusBonus",
  armorPenBpsBonus = "armorPenBpsBonus",
  attackSpeedBonus = "attackSpeedBonus",
  blockChanceBpsBonus = "blockChanceBpsBonus",
  cooldownMsBonus = "cooldownMsBonus",
  critChanceBpsBonus = "critChanceBpsBonus",
  critMultiplierBpsBonus = "critMultiplierBpsBonus",
  enchantmentSlotsBonus = "enchantmentSlotsBonus",
  energyCostBonus = "energyCostBonus",
  heatGenerationBonus = "heatGenerationBonus",
  id = "id",
  level = "level",
  lifeStealBpsBonus = "lifeStealBpsBonus",
  materia = "materia",
  materiaId = "materiaId",
  materiaSlotsBonus = "materiaSlotsBonus",
  materia__categoryLabel = "materia__categoryLabel",
  materia__categoryRaw = "materia__categoryRaw",
  materia__elementLabel = "materia__elementLabel",
  materia__elementRaw = "materia__elementRaw",
  materia__enabled = "materia__enabled",
  materia__id = "materia__id",
  materia__materiaId = "materia__materiaId",
  materia__maxLevel = "materia__maxLevel",
  materia__name = "materia__name",
  materia__rarityTier = "materia__rarityTier",
  materia__updatedAtBlock = "materia__updatedAtBlock",
  materia__updatedAtTimestamp = "materia__updatedAtTimestamp",
  maxDamageBonus = "maxDamageBonus",
  maxDurabilityBonus = "maxDurabilityBonus",
  minDamageBonus = "minDamageBonus",
  projectileSpeedBonus = "projectileSpeedBonus",
  rangeBonus = "rangeBonus",
  stabilityBonus = "stabilityBonus",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type MateriaDefinition = {
  __typename?: "MateriaDefinition";
  bonuses: Array<MateriaBonus>;
  categoryLabel: Scalars["String"]["output"];
  categoryRaw: Scalars["String"]["output"];
  elementLabel: Scalars["String"]["output"];
  elementRaw: Scalars["String"]["output"];
  enabled: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  materiaId: Scalars["BigInt"]["output"];
  maxLevel: Scalars["BigInt"]["output"];
  name: Scalars["String"]["output"];
  rarityTier: Scalars["BigInt"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type MateriaDefinitionBonusesArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MateriaBonus_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<MateriaBonus_Filter>;
};

export type MateriaDefinition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MateriaDefinition_Filter>>>;
  bonuses_?: InputMaybe<MateriaBonus_Filter>;
  categoryLabel?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_contains?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_gt?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_gte?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  categoryLabel_lt?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_lte?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_not?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  categoryLabel_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  categoryLabel_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_contains?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_gt?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_gte?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  categoryRaw_lt?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_lte?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_not?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  categoryRaw_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  categoryRaw_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_contains?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_gt?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_gte?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  elementLabel_lt?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_lte?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_not?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  elementLabel_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  elementLabel_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_contains?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_gt?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_gte?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  elementRaw_lt?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_lte?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_not?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  elementRaw_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  elementRaw_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  enabled_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  materiaId?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  materiaId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxLevel?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxLevel_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxLevel_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxLevel_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxLevel_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxLevel_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxLevel_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxLevel_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_gt?: InputMaybe<Scalars["String"]["input"]>;
  name_gte?: InputMaybe<Scalars["String"]["input"]>;
  name_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_lt?: InputMaybe<Scalars["String"]["input"]>;
  name_lte?: InputMaybe<Scalars["String"]["input"]>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<MateriaDefinition_Filter>>>;
  rarityTier?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rarityTier_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum MateriaDefinition_OrderBy {
  bonuses = "bonuses",
  categoryLabel = "categoryLabel",
  categoryRaw = "categoryRaw",
  elementLabel = "elementLabel",
  elementRaw = "elementRaw",
  enabled = "enabled",
  id = "id",
  materiaId = "materiaId",
  maxLevel = "maxLevel",
  name = "name",
  rarityTier = "rarityTier",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type MateriaItemApprovalForAllEvent = {
  __typename?: "MateriaItemApprovalForAllEvent";
  account: Scalars["Bytes"]["output"];
  approved: Scalars["Boolean"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  operator: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type MateriaItemApprovalForAllEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  account_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  account_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<MateriaItemApprovalForAllEvent_Filter>>>;
  approved?: InputMaybe<Scalars["Boolean"]["input"]>;
  approved_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  approved_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  approved_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  operator?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  operator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<MateriaItemApprovalForAllEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum MateriaItemApprovalForAllEvent_OrderBy {
  account = "account",
  approved = "approved",
  blockNumber = "blockNumber",
  id = "id",
  operator = "operator",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type MateriaItemAuthorizedConsumer = {
  __typename?: "MateriaItemAuthorizedConsumer";
  allowed: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type MateriaItemAuthorizedConsumer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowed?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowed_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<MateriaItemAuthorizedConsumer_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<MateriaItemAuthorizedConsumer_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum MateriaItemAuthorizedConsumer_OrderBy {
  allowed = "allowed",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type MateriaItemAuthorizedMinter = {
  __typename?: "MateriaItemAuthorizedMinter";
  allowed: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type MateriaItemAuthorizedMinter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowed?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  allowed_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  allowed_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<MateriaItemAuthorizedMinter_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<MateriaItemAuthorizedMinter_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum MateriaItemAuthorizedMinter_OrderBy {
  allowed = "allowed",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type MateriaItemBaseMetadataUriSetEvent = {
  __typename?: "MateriaItemBaseMetadataURISetEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newBaseMetadataURI: Scalars["String"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type MateriaItemBaseMetadataUriSetEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<
    Array<InputMaybe<MateriaItemBaseMetadataUriSetEvent_Filter>>
  >;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newBaseMetadataURI?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_contains?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_gt?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_gte?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  newBaseMetadataURI_lt?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_lte?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_not?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_not_contains_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  newBaseMetadataURI_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_not_ends_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  newBaseMetadataURI_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  newBaseMetadataURI_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  newBaseMetadataURI_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  newBaseMetadataURI_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  or?: InputMaybe<Array<InputMaybe<MateriaItemBaseMetadataUriSetEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum MateriaItemBaseMetadataUriSetEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newBaseMetadataURI = "newBaseMetadataURI",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type MateriaItemBurnedEvent = {
  __typename?: "MateriaItemBurnedEvent";
  amount: Scalars["BigInt"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  from: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  itemId: Scalars["BigInt"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type MateriaItemBurnedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<MateriaItemBurnedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  from?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  itemId?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  itemId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<MateriaItemBurnedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum MateriaItemBurnedEvent_OrderBy {
  amount = "amount",
  blockNumber = "blockNumber",
  from = "from",
  id = "id",
  itemId = "itemId",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type MateriaItemDefinition = {
  __typename?: "MateriaItemDefinition";
  burnOnUse: Scalars["Boolean"]["output"];
  enabled: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  itemId: Scalars["BigInt"]["output"];
  level: Scalars["BigInt"]["output"];
  materiaDefinitionId: Scalars["BigInt"]["output"];
  rarityTier: Scalars["BigInt"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type MateriaItemDefinition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MateriaItemDefinition_Filter>>>;
  burnOnUse?: InputMaybe<Scalars["Boolean"]["input"]>;
  burnOnUse_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  burnOnUse_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  burnOnUse_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  enabled_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  itemId?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  itemId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  level?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  level_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  level_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  materiaDefinitionId?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaDefinitionId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaDefinitionId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaDefinitionId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  materiaDefinitionId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaDefinitionId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaDefinitionId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaDefinitionId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<MateriaItemDefinition_Filter>>>;
  rarityTier?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rarityTier_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum MateriaItemDefinition_OrderBy {
  burnOnUse = "burnOnUse",
  enabled = "enabled",
  id = "id",
  itemId = "itemId",
  level = "level",
  materiaDefinitionId = "materiaDefinitionId",
  rarityTier = "rarityTier",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type MateriaItemMintedEvent = {
  __typename?: "MateriaItemMintedEvent";
  amount: Scalars["BigInt"]["output"];
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  itemId: Scalars["BigInt"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  to: Scalars["Bytes"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type MateriaItemMintedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  amount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<MateriaItemMintedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  itemId?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  itemId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  itemId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<MateriaItemMintedEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum MateriaItemMintedEvent_OrderBy {
  amount = "amount",
  blockNumber = "blockNumber",
  id = "id",
  itemId = "itemId",
  timestamp = "timestamp",
  to = "to",
  txHash = "txHash",
}

export type MateriaItemTransferBatchEvent = {
  __typename?: "MateriaItemTransferBatchEvent";
  blockNumber: Scalars["BigInt"]["output"];
  from: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  ids: Array<Scalars["BigInt"]["output"]>;
  operator: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  to: Scalars["Bytes"]["output"];
  txHash: Scalars["Bytes"]["output"];
  values: Array<Scalars["BigInt"]["output"]>;
};

export type MateriaItemTransferBatchEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MateriaItemTransferBatchEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  from?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  ids?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ids_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ids_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ids_not_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  operator?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  operator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<MateriaItemTransferBatchEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  values?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_not?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  values_not_contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum MateriaItemTransferBatchEvent_OrderBy {
  blockNumber = "blockNumber",
  from = "from",
  id = "id",
  ids = "ids",
  operator = "operator",
  timestamp = "timestamp",
  to = "to",
  txHash = "txHash",
  values = "values",
}

export type MateriaItemTransferSingleEvent = {
  __typename?: "MateriaItemTransferSingleEvent";
  blockNumber: Scalars["BigInt"]["output"];
  from: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  operator: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  to: Scalars["Bytes"]["output"];
  tokenId: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
  value: Scalars["BigInt"]["output"];
};

export type MateriaItemTransferSingleEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MateriaItemTransferSingleEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  from?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  operator?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  operator_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  operator_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<MateriaItemTransferSingleEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  tokenId?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tokenId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  value?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  value_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum MateriaItemTransferSingleEvent_OrderBy {
  blockNumber = "blockNumber",
  from = "from",
  id = "id",
  operator = "operator",
  timestamp = "timestamp",
  to = "to",
  tokenId = "tokenId",
  txHash = "txHash",
  value = "value",
}

export type MateriaItemUriEvent = {
  __typename?: "MateriaItemURIEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  tokenId: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
  value: Scalars["String"]["output"];
};

export type MateriaItemUriEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MateriaItemUriEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<MateriaItemUriEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tokenId?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tokenId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  value?: InputMaybe<Scalars["String"]["input"]>;
  value_contains?: InputMaybe<Scalars["String"]["input"]>;
  value_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  value_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_gt?: InputMaybe<Scalars["String"]["input"]>;
  value_gte?: InputMaybe<Scalars["String"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  value_lt?: InputMaybe<Scalars["String"]["input"]>;
  value_lte?: InputMaybe<Scalars["String"]["input"]>;
  value_not?: InputMaybe<Scalars["String"]["input"]>;
  value_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  value_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  value_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  value_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  value_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  value_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  value_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum MateriaItemUriEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  timestamp = "timestamp",
  tokenId = "tokenId",
  txHash = "txHash",
  value = "value",
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  asc = "asc",
  desc = "desc",
}

export type OwnershipTransferRecordedEvent = {
  __typename?: "OwnershipTransferRecordedEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  plot: Plot;
  timestamp: Scalars["BigInt"]["output"];
  transferCount: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type OwnershipTransferRecordedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OwnershipTransferRecordedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<OwnershipTransferRecordedEvent_Filter>>>;
  plot?: InputMaybe<Scalars["String"]["input"]>;
  plot_?: InputMaybe<Plot_Filter>;
  plot_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_gt?: InputMaybe<Scalars["String"]["input"]>;
  plot_gte?: InputMaybe<Scalars["String"]["input"]>;
  plot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_lt?: InputMaybe<Scalars["String"]["input"]>;
  plot_lte?: InputMaybe<Scalars["String"]["input"]>;
  plot_not?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  transferCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  transferCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  transferCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  transferCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  transferCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  transferCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  transferCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  transferCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum OwnershipTransferRecordedEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  plot = "plot",
  plot__createdAt = "plot__createdAt",
  plot__exists = "plot__exists",
  plot__faction = "plot__faction",
  plot__height = "plot__height",
  plot__id = "plot__id",
  plot__plotId = "plot__plotId",
  plot__plotType = "plot__plotType",
  plot__status = "plot__status",
  plot__width = "plot__width",
  timestamp = "timestamp",
  transferCount = "transferCount",
  txHash = "txHash",
}

export type OwnershipTransferredEvent = {
  __typename?: "OwnershipTransferredEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newOwner: Scalars["Bytes"]["output"];
  previousOwner: Scalars["Bytes"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type OwnershipTransferredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OwnershipTransferredEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  newOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  newOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<OwnershipTransferredEvent_Filter>>>;
  previousOwner?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  previousOwner_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  previousOwner_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum OwnershipTransferredEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newOwner = "newOwner",
  previousOwner = "previousOwner",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type Player = {
  __typename?: "Player";
  cityKeyTokenId?: Maybe<Scalars["BigInt"]["output"]>;
  craftedWeapons: Array<WeaponInstance>;
  faction?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  personalPlotCount: Scalars["Int"]["output"];
};

export type PlayerCraftedWeaponsArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WeaponInstance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<WeaponInstance_Filter>;
};

export type Player_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Player_Filter>>>;
  cityKeyTokenId?: InputMaybe<Scalars["BigInt"]["input"]>;
  cityKeyTokenId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  cityKeyTokenId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  cityKeyTokenId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  cityKeyTokenId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  cityKeyTokenId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  cityKeyTokenId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  cityKeyTokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  craftedWeapons_?: InputMaybe<WeaponInstance_Filter>;
  faction?: InputMaybe<Scalars["String"]["input"]>;
  faction_contains?: InputMaybe<Scalars["String"]["input"]>;
  faction_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  faction_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  faction_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  faction_gt?: InputMaybe<Scalars["String"]["input"]>;
  faction_gte?: InputMaybe<Scalars["String"]["input"]>;
  faction_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  faction_lt?: InputMaybe<Scalars["String"]["input"]>;
  faction_lte?: InputMaybe<Scalars["String"]["input"]>;
  faction_not?: InputMaybe<Scalars["String"]["input"]>;
  faction_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  faction_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  faction_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  faction_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  faction_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  faction_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  faction_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  faction_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  faction_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Player_Filter>>>;
  personalPlotCount?: InputMaybe<Scalars["Int"]["input"]>;
  personalPlotCount_gt?: InputMaybe<Scalars["Int"]["input"]>;
  personalPlotCount_gte?: InputMaybe<Scalars["Int"]["input"]>;
  personalPlotCount_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  personalPlotCount_lt?: InputMaybe<Scalars["Int"]["input"]>;
  personalPlotCount_lte?: InputMaybe<Scalars["Int"]["input"]>;
  personalPlotCount_not?: InputMaybe<Scalars["Int"]["input"]>;
  personalPlotCount_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
};

export enum Player_OrderBy {
  cityKeyTokenId = "cityKeyTokenId",
  craftedWeapons = "craftedWeapons",
  faction = "faction",
  id = "id",
  personalPlotCount = "personalPlotCount",
}

export type Plot = {
  __typename?: "Plot";
  createdAt: Scalars["BigInt"]["output"];
  exists: Scalars["Boolean"]["output"];
  faction: Scalars["String"]["output"];
  height: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  owner?: Maybe<Player>;
  plotId: Scalars["BigInt"]["output"];
  plotType: Scalars["String"]["output"];
  status: Scalars["String"]["output"];
  width: Scalars["BigInt"]["output"];
};

export type PlotCompletion = {
  __typename?: "PlotCompletion";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  plot: Plot;
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type PlotCompletion_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PlotCompletion_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<PlotCompletion_Filter>>>;
  plot?: InputMaybe<Scalars["String"]["input"]>;
  plot_?: InputMaybe<Plot_Filter>;
  plot_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_gt?: InputMaybe<Scalars["String"]["input"]>;
  plot_gte?: InputMaybe<Scalars["String"]["input"]>;
  plot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_lt?: InputMaybe<Scalars["String"]["input"]>;
  plot_lte?: InputMaybe<Scalars["String"]["input"]>;
  plot_not?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum PlotCompletion_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  plot = "plot",
  plot__createdAt = "plot__createdAt",
  plot__exists = "plot__exists",
  plot__faction = "plot__faction",
  plot__height = "plot__height",
  plot__id = "plot__id",
  plot__plotId = "plot__plotId",
  plot__plotType = "plot__plotType",
  plot__status = "plot__status",
  plot__width = "plot__width",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type PlotDistrict = {
  __typename?: "PlotDistrict";
  bonusBps: Scalars["String"]["output"];
  exists: Scalars["Boolean"]["output"];
  factionLabel: Scalars["String"]["output"];
  factionRaw: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isBorderline: Scalars["Boolean"]["output"];
  kindLabel: Scalars["String"]["output"];
  kindRaw: Scalars["String"]["output"];
  plot: Plot;
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type PlotDistrict_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PlotDistrict_Filter>>>;
  bonusBps?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_contains?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_gt?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_gte?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  bonusBps_lt?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_lte?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_not?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  bonusBps_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  bonusBps_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  exists_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  exists_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  exists_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  factionLabel?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_contains?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_gt?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_gte?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  factionLabel_lt?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_lte?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_not?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  factionLabel_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_contains?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_gt?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_gte?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  factionRaw_lt?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_lte?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_not?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  factionRaw_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  factionRaw_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  isBorderline?: InputMaybe<Scalars["Boolean"]["input"]>;
  isBorderline_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  isBorderline_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  isBorderline_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  kindLabel?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_contains?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_gt?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_gte?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  kindLabel_lt?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_lte?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_not?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  kindLabel_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  kindLabel_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_contains?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_gt?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_gte?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  kindRaw_lt?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_lte?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_not?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  kindRaw_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  kindRaw_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<PlotDistrict_Filter>>>;
  plot?: InputMaybe<Scalars["String"]["input"]>;
  plot_?: InputMaybe<Plot_Filter>;
  plot_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_gt?: InputMaybe<Scalars["String"]["input"]>;
  plot_gte?: InputMaybe<Scalars["String"]["input"]>;
  plot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_lt?: InputMaybe<Scalars["String"]["input"]>;
  plot_lte?: InputMaybe<Scalars["String"]["input"]>;
  plot_not?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum PlotDistrict_OrderBy {
  bonusBps = "bonusBps",
  exists = "exists",
  factionLabel = "factionLabel",
  factionRaw = "factionRaw",
  id = "id",
  isBorderline = "isBorderline",
  kindLabel = "kindLabel",
  kindRaw = "kindRaw",
  plot = "plot",
  plot__createdAt = "plot__createdAt",
  plot__exists = "plot__exists",
  plot__faction = "plot__faction",
  plot__height = "plot__height",
  plot__id = "plot__id",
  plot__plotId = "plot__plotId",
  plot__plotType = "plot__plotType",
  plot__status = "plot__status",
  plot__width = "plot__width",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type PlotHistoryInitializedEvent = {
  __typename?: "PlotHistoryInitializedEvent";
  blockNumber: Scalars["BigInt"]["output"];
  faction: Scalars["Int"]["output"];
  factionLabel?: Maybe<Scalars["String"]["output"]>;
  firstBuilder: Scalars["Bytes"]["output"];
  genesisEra: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  plot: Plot;
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type PlotHistoryInitializedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PlotHistoryInitializedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  faction?: InputMaybe<Scalars["Int"]["input"]>;
  factionLabel?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_contains?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_gt?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_gte?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  factionLabel_lt?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_lte?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_not?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  factionLabel_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  factionLabel_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  faction_gt?: InputMaybe<Scalars["Int"]["input"]>;
  faction_gte?: InputMaybe<Scalars["Int"]["input"]>;
  faction_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  faction_lt?: InputMaybe<Scalars["Int"]["input"]>;
  faction_lte?: InputMaybe<Scalars["Int"]["input"]>;
  faction_not?: InputMaybe<Scalars["Int"]["input"]>;
  faction_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  firstBuilder?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  firstBuilder_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  genesisEra?: InputMaybe<Scalars["Boolean"]["input"]>;
  genesisEra_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  genesisEra_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  genesisEra_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<PlotHistoryInitializedEvent_Filter>>>;
  plot?: InputMaybe<Scalars["String"]["input"]>;
  plot_?: InputMaybe<Plot_Filter>;
  plot_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_gt?: InputMaybe<Scalars["String"]["input"]>;
  plot_gte?: InputMaybe<Scalars["String"]["input"]>;
  plot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_lt?: InputMaybe<Scalars["String"]["input"]>;
  plot_lte?: InputMaybe<Scalars["String"]["input"]>;
  plot_not?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum PlotHistoryInitializedEvent_OrderBy {
  blockNumber = "blockNumber",
  faction = "faction",
  factionLabel = "factionLabel",
  firstBuilder = "firstBuilder",
  genesisEra = "genesisEra",
  id = "id",
  plot = "plot",
  plot__createdAt = "plot__createdAt",
  plot__exists = "plot__exists",
  plot__faction = "plot__faction",
  plot__height = "plot__height",
  plot__id = "plot__id",
  plot__plotId = "plot__plotId",
  plot__plotType = "plot__plotType",
  plot__status = "plot__status",
  plot__width = "plot__width",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type PlotProvenance = {
  __typename?: "PlotProvenance";
  aetherUses: Scalars["BigInt"]["output"];
  createdAt?: Maybe<Scalars["BigInt"]["output"]>;
  firstBuilder?: Maybe<Scalars["Bytes"]["output"]>;
  genesisEra: Scalars["Boolean"]["output"];
  historicScore: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  layerCount: Scalars["BigInt"]["output"];
  originFaction?: Maybe<Scalars["String"]["output"]>;
  ownershipTransfers: Scalars["BigInt"]["output"];
  plot: Plot;
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type PlotProvenance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  aetherUses?: InputMaybe<Scalars["BigInt"]["input"]>;
  aetherUses_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  aetherUses_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  aetherUses_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  aetherUses_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  aetherUses_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  aetherUses_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  aetherUses_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<PlotProvenance_Filter>>>;
  createdAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  firstBuilder?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  firstBuilder_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  firstBuilder_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  genesisEra?: InputMaybe<Scalars["Boolean"]["input"]>;
  genesisEra_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  genesisEra_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  genesisEra_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  historicScore?: InputMaybe<Scalars["BigInt"]["input"]>;
  historicScore_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  historicScore_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  historicScore_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  historicScore_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  historicScore_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  historicScore_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  historicScore_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  layerCount?: InputMaybe<Scalars["BigInt"]["input"]>;
  layerCount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  layerCount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  layerCount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  layerCount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  layerCount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  layerCount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  layerCount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<PlotProvenance_Filter>>>;
  originFaction?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_contains?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_gt?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_gte?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  originFaction_lt?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_lte?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_not?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  originFaction_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  originFaction_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  ownershipTransfers?: InputMaybe<Scalars["BigInt"]["input"]>;
  ownershipTransfers_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  ownershipTransfers_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  ownershipTransfers_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ownershipTransfers_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  ownershipTransfers_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  ownershipTransfers_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  ownershipTransfers_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  plot?: InputMaybe<Scalars["String"]["input"]>;
  plot_?: InputMaybe<Plot_Filter>;
  plot_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_gt?: InputMaybe<Scalars["String"]["input"]>;
  plot_gte?: InputMaybe<Scalars["String"]["input"]>;
  plot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_lt?: InputMaybe<Scalars["String"]["input"]>;
  plot_lte?: InputMaybe<Scalars["String"]["input"]>;
  plot_not?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum PlotProvenance_OrderBy {
  aetherUses = "aetherUses",
  createdAt = "createdAt",
  firstBuilder = "firstBuilder",
  genesisEra = "genesisEra",
  historicScore = "historicScore",
  id = "id",
  layerCount = "layerCount",
  originFaction = "originFaction",
  ownershipTransfers = "ownershipTransfers",
  plot = "plot",
  plot__createdAt = "plot__createdAt",
  plot__exists = "plot__exists",
  plot__faction = "plot__faction",
  plot__height = "plot__height",
  plot__id = "plot__id",
  plot__plotId = "plot__plotId",
  plot__plotType = "plot__plotType",
  plot__status = "plot__status",
  plot__width = "plot__width",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type PlotQubiq = {
  __typename?: "PlotQubiq";
  completed: Scalars["Boolean"]["output"];
  completedAt?: Maybe<Scalars["BigInt"]["output"]>;
  createdAt: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  ironDeposited: Scalars["BigInt"]["output"];
  lastContributor?: Maybe<Scalars["Bytes"]["output"]>;
  lemonsDeposited: Scalars["BigInt"]["output"];
  oilDeposited: Scalars["BigInt"]["output"];
  plot: Plot;
  updatedAt: Scalars["BigInt"]["output"];
  usedAether: Scalars["Boolean"]["output"];
  x: Scalars["Int"]["output"];
  y: Scalars["Int"]["output"];
};

export type PlotQubiq_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PlotQubiq_Filter>>>;
  completed?: InputMaybe<Scalars["Boolean"]["input"]>;
  completedAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  completedAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  completedAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  completedAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  completedAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  completedAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  completedAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  completedAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  completed_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  completed_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  completed_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  createdAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  ironDeposited?: InputMaybe<Scalars["BigInt"]["input"]>;
  ironDeposited_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  ironDeposited_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  ironDeposited_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  ironDeposited_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  ironDeposited_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  ironDeposited_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  ironDeposited_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lastContributor?: InputMaybe<Scalars["Bytes"]["input"]>;
  lastContributor_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  lastContributor_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  lastContributor_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  lastContributor_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  lastContributor_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  lastContributor_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  lastContributor_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  lastContributor_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  lastContributor_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  lemonsDeposited?: InputMaybe<Scalars["BigInt"]["input"]>;
  lemonsDeposited_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lemonsDeposited_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lemonsDeposited_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lemonsDeposited_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lemonsDeposited_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lemonsDeposited_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  lemonsDeposited_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  oilDeposited?: InputMaybe<Scalars["BigInt"]["input"]>;
  oilDeposited_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  oilDeposited_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  oilDeposited_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  oilDeposited_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  oilDeposited_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  oilDeposited_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  oilDeposited_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<PlotQubiq_Filter>>>;
  plot?: InputMaybe<Scalars["String"]["input"]>;
  plot_?: InputMaybe<Plot_Filter>;
  plot_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_gt?: InputMaybe<Scalars["String"]["input"]>;
  plot_gte?: InputMaybe<Scalars["String"]["input"]>;
  plot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_lt?: InputMaybe<Scalars["String"]["input"]>;
  plot_lte?: InputMaybe<Scalars["String"]["input"]>;
  plot_not?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  updatedAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  usedAether?: InputMaybe<Scalars["Boolean"]["input"]>;
  usedAether_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  usedAether_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  usedAether_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  x?: InputMaybe<Scalars["Int"]["input"]>;
  x_gt?: InputMaybe<Scalars["Int"]["input"]>;
  x_gte?: InputMaybe<Scalars["Int"]["input"]>;
  x_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  x_lt?: InputMaybe<Scalars["Int"]["input"]>;
  x_lte?: InputMaybe<Scalars["Int"]["input"]>;
  x_not?: InputMaybe<Scalars["Int"]["input"]>;
  x_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  y?: InputMaybe<Scalars["Int"]["input"]>;
  y_gt?: InputMaybe<Scalars["Int"]["input"]>;
  y_gte?: InputMaybe<Scalars["Int"]["input"]>;
  y_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  y_lt?: InputMaybe<Scalars["Int"]["input"]>;
  y_lte?: InputMaybe<Scalars["Int"]["input"]>;
  y_not?: InputMaybe<Scalars["Int"]["input"]>;
  y_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
};

export enum PlotQubiq_OrderBy {
  completed = "completed",
  completedAt = "completedAt",
  createdAt = "createdAt",
  id = "id",
  ironDeposited = "ironDeposited",
  lastContributor = "lastContributor",
  lemonsDeposited = "lemonsDeposited",
  oilDeposited = "oilDeposited",
  plot = "plot",
  plot__createdAt = "plot__createdAt",
  plot__exists = "plot__exists",
  plot__faction = "plot__faction",
  plot__height = "plot__height",
  plot__id = "plot__id",
  plot__plotId = "plot__plotId",
  plot__plotType = "plot__plotType",
  plot__status = "plot__status",
  plot__width = "plot__width",
  updatedAt = "updatedAt",
  usedAether = "usedAether",
  x = "x",
  y = "y",
}

export type PlotStats = {
  __typename?: "PlotStats";
  aetherUsesCount: Scalars["Int"]["output"];
  completedQubiqCount: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  plot: Plot;
  totalIron: Scalars["BigInt"]["output"];
  totalLemons: Scalars["BigInt"]["output"];
  totalOil: Scalars["BigInt"]["output"];
  updatedAt: Scalars["BigInt"]["output"];
};

export type PlotStats_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  aetherUsesCount?: InputMaybe<Scalars["Int"]["input"]>;
  aetherUsesCount_gt?: InputMaybe<Scalars["Int"]["input"]>;
  aetherUsesCount_gte?: InputMaybe<Scalars["Int"]["input"]>;
  aetherUsesCount_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  aetherUsesCount_lt?: InputMaybe<Scalars["Int"]["input"]>;
  aetherUsesCount_lte?: InputMaybe<Scalars["Int"]["input"]>;
  aetherUsesCount_not?: InputMaybe<Scalars["Int"]["input"]>;
  aetherUsesCount_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<PlotStats_Filter>>>;
  completedQubiqCount?: InputMaybe<Scalars["Int"]["input"]>;
  completedQubiqCount_gt?: InputMaybe<Scalars["Int"]["input"]>;
  completedQubiqCount_gte?: InputMaybe<Scalars["Int"]["input"]>;
  completedQubiqCount_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  completedQubiqCount_lt?: InputMaybe<Scalars["Int"]["input"]>;
  completedQubiqCount_lte?: InputMaybe<Scalars["Int"]["input"]>;
  completedQubiqCount_not?: InputMaybe<Scalars["Int"]["input"]>;
  completedQubiqCount_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<PlotStats_Filter>>>;
  plot?: InputMaybe<Scalars["String"]["input"]>;
  plot_?: InputMaybe<Plot_Filter>;
  plot_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_gt?: InputMaybe<Scalars["String"]["input"]>;
  plot_gte?: InputMaybe<Scalars["String"]["input"]>;
  plot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_lt?: InputMaybe<Scalars["String"]["input"]>;
  plot_lte?: InputMaybe<Scalars["String"]["input"]>;
  plot_not?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  totalIron?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalIron_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalIron_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalIron_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalIron_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalIron_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalIron_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalIron_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalLemons?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalLemons_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalLemons_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalLemons_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalLemons_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalLemons_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalLemons_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalLemons_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalOil?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalOil_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalOil_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalOil_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  totalOil_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalOil_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalOil_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  totalOil_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum PlotStats_OrderBy {
  aetherUsesCount = "aetherUsesCount",
  completedQubiqCount = "completedQubiqCount",
  id = "id",
  plot = "plot",
  plot__createdAt = "plot__createdAt",
  plot__exists = "plot__exists",
  plot__faction = "plot__faction",
  plot__height = "plot__height",
  plot__id = "plot__id",
  plot__plotId = "plot__plotId",
  plot__plotType = "plot__plotType",
  plot__status = "plot__status",
  plot__width = "plot__width",
  totalIron = "totalIron",
  totalLemons = "totalLemons",
  totalOil = "totalOil",
  updatedAt = "updatedAt",
}

export type PlotStatusInfo = {
  __typename?: "PlotStatusInfo";
  derivedStatus: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  lastActivityAt: Scalars["BigInt"]["output"];
  lastMaintenanceAt: Scalars["BigInt"]["output"];
  layerEligible: Scalars["Boolean"]["output"];
  manualStatusOverride: Scalars["String"]["output"];
  plot: Plot;
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type PlotStatusInfo_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PlotStatusInfo_Filter>>>;
  derivedStatus?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_contains?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_gt?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_gte?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  derivedStatus_lt?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_lte?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_not?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  derivedStatus_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  derivedStatus_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  lastActivityAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActivityAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActivityAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActivityAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lastActivityAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActivityAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActivityAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastActivityAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lastMaintenanceAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastMaintenanceAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastMaintenanceAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastMaintenanceAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lastMaintenanceAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastMaintenanceAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastMaintenanceAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  lastMaintenanceAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  layerEligible?: InputMaybe<Scalars["Boolean"]["input"]>;
  layerEligible_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  layerEligible_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  layerEligible_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  manualStatusOverride?: InputMaybe<Scalars["String"]["input"]>;
  manualStatusOverride_contains?: InputMaybe<Scalars["String"]["input"]>;
  manualStatusOverride_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  manualStatusOverride_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  manualStatusOverride_ends_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  manualStatusOverride_gt?: InputMaybe<Scalars["String"]["input"]>;
  manualStatusOverride_gte?: InputMaybe<Scalars["String"]["input"]>;
  manualStatusOverride_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  manualStatusOverride_lt?: InputMaybe<Scalars["String"]["input"]>;
  manualStatusOverride_lte?: InputMaybe<Scalars["String"]["input"]>;
  manualStatusOverride_not?: InputMaybe<Scalars["String"]["input"]>;
  manualStatusOverride_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  manualStatusOverride_not_contains_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  manualStatusOverride_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  manualStatusOverride_not_ends_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  manualStatusOverride_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  manualStatusOverride_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  manualStatusOverride_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  manualStatusOverride_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  manualStatusOverride_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  or?: InputMaybe<Array<InputMaybe<PlotStatusInfo_Filter>>>;
  plot?: InputMaybe<Scalars["String"]["input"]>;
  plot_?: InputMaybe<Plot_Filter>;
  plot_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_gt?: InputMaybe<Scalars["String"]["input"]>;
  plot_gte?: InputMaybe<Scalars["String"]["input"]>;
  plot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_lt?: InputMaybe<Scalars["String"]["input"]>;
  plot_lte?: InputMaybe<Scalars["String"]["input"]>;
  plot_not?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum PlotStatusInfo_OrderBy {
  derivedStatus = "derivedStatus",
  id = "id",
  lastActivityAt = "lastActivityAt",
  lastMaintenanceAt = "lastMaintenanceAt",
  layerEligible = "layerEligible",
  manualStatusOverride = "manualStatusOverride",
  plot = "plot",
  plot__createdAt = "plot__createdAt",
  plot__exists = "plot__exists",
  plot__faction = "plot__faction",
  plot__height = "plot__height",
  plot__id = "plot__id",
  plot__plotId = "plot__plotId",
  plot__plotType = "plot__plotType",
  plot__status = "plot__status",
  plot__width = "plot__width",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type PlotStatusUpdatedEvent = {
  __typename?: "PlotStatusUpdatedEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  newStatus: Scalars["Int"]["output"];
  newStatusLabel: Scalars["String"]["output"];
  oldStatus: Scalars["Int"]["output"];
  oldStatusLabel: Scalars["String"]["output"];
  plot: Plot;
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type PlotStatusUpdatedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PlotStatusUpdatedEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  newStatus?: InputMaybe<Scalars["Int"]["input"]>;
  newStatusLabel?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_contains?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_gt?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_gte?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  newStatusLabel_lt?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_lte?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_not?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  newStatusLabel_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  newStatusLabel_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  newStatusLabel_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  newStatus_gt?: InputMaybe<Scalars["Int"]["input"]>;
  newStatus_gte?: InputMaybe<Scalars["Int"]["input"]>;
  newStatus_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  newStatus_lt?: InputMaybe<Scalars["Int"]["input"]>;
  newStatus_lte?: InputMaybe<Scalars["Int"]["input"]>;
  newStatus_not?: InputMaybe<Scalars["Int"]["input"]>;
  newStatus_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  oldStatus?: InputMaybe<Scalars["Int"]["input"]>;
  oldStatusLabel?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_contains?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_gt?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_gte?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  oldStatusLabel_lt?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_lte?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_not?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  oldStatusLabel_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  oldStatusLabel_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  oldStatusLabel_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  oldStatus_gt?: InputMaybe<Scalars["Int"]["input"]>;
  oldStatus_gte?: InputMaybe<Scalars["Int"]["input"]>;
  oldStatus_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  oldStatus_lt?: InputMaybe<Scalars["Int"]["input"]>;
  oldStatus_lte?: InputMaybe<Scalars["Int"]["input"]>;
  oldStatus_not?: InputMaybe<Scalars["Int"]["input"]>;
  oldStatus_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<PlotStatusUpdatedEvent_Filter>>>;
  plot?: InputMaybe<Scalars["String"]["input"]>;
  plot_?: InputMaybe<Plot_Filter>;
  plot_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_gt?: InputMaybe<Scalars["String"]["input"]>;
  plot_gte?: InputMaybe<Scalars["String"]["input"]>;
  plot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_lt?: InputMaybe<Scalars["String"]["input"]>;
  plot_lte?: InputMaybe<Scalars["String"]["input"]>;
  plot_not?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum PlotStatusUpdatedEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  newStatus = "newStatus",
  newStatusLabel = "newStatusLabel",
  oldStatus = "oldStatus",
  oldStatusLabel = "oldStatusLabel",
  plot = "plot",
  plot__createdAt = "plot__createdAt",
  plot__exists = "plot__exists",
  plot__faction = "plot__faction",
  plot__height = "plot__height",
  plot__id = "plot__id",
  plot__plotId = "plot__plotId",
  plot__plotType = "plot__plotType",
  plot__status = "plot__status",
  plot__width = "plot__width",
  timestamp = "timestamp",
  txHash = "txHash",
}

export type Plot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Plot_Filter>>>;
  createdAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  exists_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  exists_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  exists_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  faction?: InputMaybe<Scalars["String"]["input"]>;
  faction_contains?: InputMaybe<Scalars["String"]["input"]>;
  faction_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  faction_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  faction_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  faction_gt?: InputMaybe<Scalars["String"]["input"]>;
  faction_gte?: InputMaybe<Scalars["String"]["input"]>;
  faction_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  faction_lt?: InputMaybe<Scalars["String"]["input"]>;
  faction_lte?: InputMaybe<Scalars["String"]["input"]>;
  faction_not?: InputMaybe<Scalars["String"]["input"]>;
  faction_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  faction_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  faction_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  faction_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  faction_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  faction_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  faction_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  faction_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  faction_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  height?: InputMaybe<Scalars["BigInt"]["input"]>;
  height_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  height_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  height_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  height_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  height_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  height_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  height_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<Plot_Filter>>>;
  owner?: InputMaybe<Scalars["String"]["input"]>;
  owner_?: InputMaybe<Player_Filter>;
  owner_contains?: InputMaybe<Scalars["String"]["input"]>;
  owner_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  owner_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  owner_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  owner_gt?: InputMaybe<Scalars["String"]["input"]>;
  owner_gte?: InputMaybe<Scalars["String"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["String"]["input"]>;
  owner_lte?: InputMaybe<Scalars["String"]["input"]>;
  owner_not?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  owner_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  owner_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  owner_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plotId?: InputMaybe<Scalars["BigInt"]["input"]>;
  plotId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  plotId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  plotId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  plotId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  plotId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  plotId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  plotId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  plotType?: InputMaybe<Scalars["String"]["input"]>;
  plotType_contains?: InputMaybe<Scalars["String"]["input"]>;
  plotType_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plotType_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plotType_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plotType_gt?: InputMaybe<Scalars["String"]["input"]>;
  plotType_gte?: InputMaybe<Scalars["String"]["input"]>;
  plotType_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plotType_lt?: InputMaybe<Scalars["String"]["input"]>;
  plotType_lte?: InputMaybe<Scalars["String"]["input"]>;
  plotType_not?: InputMaybe<Scalars["String"]["input"]>;
  plotType_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plotType_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plotType_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plotType_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plotType_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plotType_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plotType_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plotType_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plotType_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  status_contains?: InputMaybe<Scalars["String"]["input"]>;
  status_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  status_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  status_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  status_gt?: InputMaybe<Scalars["String"]["input"]>;
  status_gte?: InputMaybe<Scalars["String"]["input"]>;
  status_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  status_lt?: InputMaybe<Scalars["String"]["input"]>;
  status_lte?: InputMaybe<Scalars["String"]["input"]>;
  status_not?: InputMaybe<Scalars["String"]["input"]>;
  status_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  status_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  status_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  status_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  status_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  status_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  status_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  status_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  status_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  width?: InputMaybe<Scalars["BigInt"]["input"]>;
  width_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  width_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  width_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  width_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  width_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  width_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  width_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum Plot_OrderBy {
  createdAt = "createdAt",
  exists = "exists",
  faction = "faction",
  height = "height",
  id = "id",
  owner = "owner",
  owner__cityKeyTokenId = "owner__cityKeyTokenId",
  owner__faction = "owner__faction",
  owner__id = "owner__id",
  owner__personalPlotCount = "owner__personalPlotCount",
  plotId = "plotId",
  plotType = "plotType",
  status = "status",
  width = "width",
}

export type QubiqContribution = {
  __typename?: "QubiqContribution";
  blockNumber: Scalars["BigInt"]["output"];
  contributor: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  iron: Scalars["BigInt"]["output"];
  lemons: Scalars["BigInt"]["output"];
  oil: Scalars["BigInt"]["output"];
  plot: Plot;
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
  x: Scalars["Int"]["output"];
  y: Scalars["Int"]["output"];
};

export type QubiqContribution_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<QubiqContribution_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  contributor?: InputMaybe<Scalars["Bytes"]["input"]>;
  contributor_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  contributor_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  contributor_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  contributor_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  contributor_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  contributor_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  contributor_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  contributor_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  contributor_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  iron?: InputMaybe<Scalars["BigInt"]["input"]>;
  iron_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  iron_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  iron_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  iron_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  iron_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  iron_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  iron_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lemons?: InputMaybe<Scalars["BigInt"]["input"]>;
  lemons_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lemons_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lemons_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lemons_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lemons_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lemons_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  lemons_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  oil?: InputMaybe<Scalars["BigInt"]["input"]>;
  oil_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  oil_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  oil_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  oil_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  oil_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  oil_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  oil_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<QubiqContribution_Filter>>>;
  plot?: InputMaybe<Scalars["String"]["input"]>;
  plot_?: InputMaybe<Plot_Filter>;
  plot_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_gt?: InputMaybe<Scalars["String"]["input"]>;
  plot_gte?: InputMaybe<Scalars["String"]["input"]>;
  plot_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_lt?: InputMaybe<Scalars["String"]["input"]>;
  plot_lte?: InputMaybe<Scalars["String"]["input"]>;
  plot_not?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  plot_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  plot_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  x?: InputMaybe<Scalars["Int"]["input"]>;
  x_gt?: InputMaybe<Scalars["Int"]["input"]>;
  x_gte?: InputMaybe<Scalars["Int"]["input"]>;
  x_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  x_lt?: InputMaybe<Scalars["Int"]["input"]>;
  x_lte?: InputMaybe<Scalars["Int"]["input"]>;
  x_not?: InputMaybe<Scalars["Int"]["input"]>;
  x_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  y?: InputMaybe<Scalars["Int"]["input"]>;
  y_gt?: InputMaybe<Scalars["Int"]["input"]>;
  y_gte?: InputMaybe<Scalars["Int"]["input"]>;
  y_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  y_lt?: InputMaybe<Scalars["Int"]["input"]>;
  y_lte?: InputMaybe<Scalars["Int"]["input"]>;
  y_not?: InputMaybe<Scalars["Int"]["input"]>;
  y_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
};

export enum QubiqContribution_OrderBy {
  blockNumber = "blockNumber",
  contributor = "contributor",
  id = "id",
  iron = "iron",
  lemons = "lemons",
  oil = "oil",
  plot = "plot",
  plot__createdAt = "plot__createdAt",
  plot__exists = "plot__exists",
  plot__faction = "plot__faction",
  plot__height = "plot__height",
  plot__id = "plot__id",
  plot__plotId = "plot__plotId",
  plot__plotType = "plot__plotType",
  plot__status = "plot__status",
  plot__width = "plot__width",
  timestamp = "timestamp",
  txHash = "txHash",
  x = "x",
  y = "y",
}

export type Query = {
  __typename?: "Query";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  aetherUse?: Maybe<AetherUse>;
  aetherUseRecordedEvent?: Maybe<AetherUseRecordedEvent>;
  aetherUseRecordedEvents: Array<AetherUseRecordedEvent>;
  aetherUses: Array<AetherUse>;
  approvalEvent?: Maybe<ApprovalEvent>;
  approvalEvents: Array<ApprovalEvent>;
  approvalForAllEvent?: Maybe<ApprovalForAllEvent>;
  approvalForAllEvents: Array<ApprovalForAllEvent>;
  authorizedCaller?: Maybe<AuthorizedCaller>;
  authorizedCallers: Array<AuthorizedCaller>;
  authorizedMinter?: Maybe<AuthorizedMinter>;
  authorizedMinters: Array<AuthorizedMinter>;
  baseURI?: Maybe<BaseUri>;
  baseURIs: Array<BaseUri>;
  blueprintApprovalForAllEvent?: Maybe<BlueprintApprovalForAllEvent>;
  blueprintApprovalForAllEvents: Array<BlueprintApprovalForAllEvent>;
  blueprintAuthorizedConsumer?: Maybe<BlueprintAuthorizedConsumer>;
  blueprintAuthorizedConsumers: Array<BlueprintAuthorizedConsumer>;
  blueprintAuthorizedMinter?: Maybe<BlueprintAuthorizedMinter>;
  blueprintAuthorizedMinters: Array<BlueprintAuthorizedMinter>;
  blueprintBalance?: Maybe<BlueprintBalance>;
  blueprintBalances: Array<BlueprintBalance>;
  blueprintBaseMetadataURI?: Maybe<BlueprintBaseMetadataUri>;
  blueprintBaseMetadataURIs: Array<BlueprintBaseMetadataUri>;
  blueprintBurnEvent?: Maybe<BlueprintBurnEvent>;
  blueprintBurnEvents: Array<BlueprintBurnEvent>;
  blueprintDefinition?: Maybe<BlueprintDefinition>;
  blueprintDefinitions: Array<BlueprintDefinition>;
  blueprintMintEvent?: Maybe<BlueprintMintEvent>;
  blueprintMintEvents: Array<BlueprintMintEvent>;
  blueprintTransferBatchEvent?: Maybe<BlueprintTransferBatchEvent>;
  blueprintTransferBatchEvents: Array<BlueprintTransferBatchEvent>;
  blueprintTransferSingleEvent?: Maybe<BlueprintTransferSingleEvent>;
  blueprintTransferSingleEvents: Array<BlueprintTransferSingleEvent>;
  blueprintURIEvent?: Maybe<BlueprintUriEvent>;
  blueprintURIEvents: Array<BlueprintUriEvent>;
  cityBlueprints?: Maybe<CityBlueprints>;
  cityBlueprintsOwnershipTransferredEvent?: Maybe<CityBlueprintsOwnershipTransferredEvent>;
  cityBlueprintsOwnershipTransferredEvents: Array<CityBlueprintsOwnershipTransferredEvent>;
  cityBlueprints_collection: Array<CityBlueprints>;
  cityComponents?: Maybe<CityComponents>;
  cityComponentsOwnershipTransferredEvent?: Maybe<CityComponentsOwnershipTransferredEvent>;
  cityComponentsOwnershipTransferredEvents: Array<CityComponentsOwnershipTransferredEvent>;
  cityComponents_collection: Array<CityComponents>;
  cityConfigAddressEntries: Array<CityConfigAddressEntry>;
  cityConfigAddressEntry?: Maybe<CityConfigAddressEntry>;
  cityConfigState?: Maybe<CityConfigState>;
  cityConfigStates: Array<CityConfigState>;
  cityConfigUintEntries: Array<CityConfigUintEntry>;
  cityConfigUintEntry?: Maybe<CityConfigUintEntry>;
  cityDistrictsOwnershipTransferredEvent?: Maybe<CityDistrictsOwnershipTransferredEvent>;
  cityDistrictsOwnershipTransferredEvents: Array<CityDistrictsOwnershipTransferredEvent>;
  cityEnchantmentItemsOwnershipTransferredEvent?: Maybe<CityEnchantmentItemsOwnershipTransferredEvent>;
  cityEnchantmentItemsOwnershipTransferredEvents: Array<CityEnchantmentItemsOwnershipTransferredEvent>;
  cityEnchantmentsOwnershipTransferredEvent?: Maybe<CityEnchantmentsOwnershipTransferredEvent>;
  cityEnchantmentsOwnershipTransferredEvents: Array<CityEnchantmentsOwnershipTransferredEvent>;
  cityHistoryOwnershipTransferredEvent?: Maybe<CityHistoryOwnershipTransferredEvent>;
  cityHistoryOwnershipTransferredEvents: Array<CityHistoryOwnershipTransferredEvent>;
  cityMateriaItemsOwnershipTransferredEvent?: Maybe<CityMateriaItemsOwnershipTransferredEvent>;
  cityMateriaItemsOwnershipTransferredEvents: Array<CityMateriaItemsOwnershipTransferredEvent>;
  cityMateriaOwnershipTransferredEvent?: Maybe<CityMateriaOwnershipTransferredEvent>;
  cityMateriaOwnershipTransferredEvents: Array<CityMateriaOwnershipTransferredEvent>;
  cityStatusOwnershipTransferredEvent?: Maybe<CityStatusOwnershipTransferredEvent>;
  cityStatusOwnershipTransferredEvents: Array<CityStatusOwnershipTransferredEvent>;
  cityValidationOwnershipTransferredEvent?: Maybe<CityValidationOwnershipTransferredEvent>;
  cityValidationOwnershipTransferredEvents: Array<CityValidationOwnershipTransferredEvent>;
  cityWeaponsAddress?: Maybe<CityWeaponsAddress>;
  cityWeaponsAddresses: Array<CityWeaponsAddress>;
  componentApprovalForAllEvent?: Maybe<ComponentApprovalForAllEvent>;
  componentApprovalForAllEvents: Array<ComponentApprovalForAllEvent>;
  componentAuthorizedConsumer?: Maybe<ComponentAuthorizedConsumer>;
  componentAuthorizedConsumers: Array<ComponentAuthorizedConsumer>;
  componentAuthorizedMinter?: Maybe<ComponentAuthorizedMinter>;
  componentAuthorizedMinters: Array<ComponentAuthorizedMinter>;
  componentBalance?: Maybe<ComponentBalance>;
  componentBalances: Array<ComponentBalance>;
  componentBaseMetadataURI?: Maybe<ComponentBaseMetadataUri>;
  componentBaseMetadataURIs: Array<ComponentBaseMetadataUri>;
  componentBurnEvent?: Maybe<ComponentBurnEvent>;
  componentBurnEvents: Array<ComponentBurnEvent>;
  componentDefinition?: Maybe<ComponentDefinition>;
  componentDefinitions: Array<ComponentDefinition>;
  componentMintEvent?: Maybe<ComponentMintEvent>;
  componentMintEvents: Array<ComponentMintEvent>;
  componentTransferBatchEvent?: Maybe<ComponentTransferBatchEvent>;
  componentTransferBatchEvents: Array<ComponentTransferBatchEvent>;
  componentTransferSingleEvent?: Maybe<ComponentTransferSingleEvent>;
  componentTransferSingleEvents: Array<ComponentTransferSingleEvent>;
  componentURIEvent?: Maybe<ComponentUriEvent>;
  componentURIEvents: Array<ComponentUriEvent>;
  configInitializedEvent?: Maybe<ConfigInitializedEvent>;
  configInitializedEvents: Array<ConfigInitializedEvent>;
  configOwnershipTransferredEvent?: Maybe<ConfigOwnershipTransferredEvent>;
  configOwnershipTransferredEvents: Array<ConfigOwnershipTransferredEvent>;
  coreAddressSetEvent?: Maybe<CoreAddressSetEvent>;
  coreAddressSetEvents: Array<CoreAddressSetEvent>;
  craftEvent?: Maybe<CraftEvent>;
  craftEvents: Array<CraftEvent>;
  craftingOwnershipTransferredEvent?: Maybe<CraftingOwnershipTransferredEvent>;
  craftingOwnershipTransferredEvents: Array<CraftingOwnershipTransferredEvent>;
  craftingPaused?: Maybe<CraftingPaused>;
  craftingPauseds: Array<CraftingPaused>;
  districtAuthorizedCaller?: Maybe<DistrictAuthorizedCaller>;
  districtAuthorizedCallers: Array<DistrictAuthorizedCaller>;
  enchantmentAuthorizedCaller?: Maybe<EnchantmentAuthorizedCaller>;
  enchantmentAuthorizedCallers: Array<EnchantmentAuthorizedCaller>;
  enchantmentBonusSet?: Maybe<EnchantmentBonusSet>;
  enchantmentBonusSets: Array<EnchantmentBonusSet>;
  enchantmentDefinition?: Maybe<EnchantmentDefinition>;
  enchantmentDefinitions: Array<EnchantmentDefinition>;
  enchantmentItemApprovalForAllEvent?: Maybe<EnchantmentItemApprovalForAllEvent>;
  enchantmentItemApprovalForAllEvents: Array<EnchantmentItemApprovalForAllEvent>;
  enchantmentItemAuthorizedConsumer?: Maybe<EnchantmentItemAuthorizedConsumer>;
  enchantmentItemAuthorizedConsumers: Array<EnchantmentItemAuthorizedConsumer>;
  enchantmentItemAuthorizedMinter?: Maybe<EnchantmentItemAuthorizedMinter>;
  enchantmentItemAuthorizedMinters: Array<EnchantmentItemAuthorizedMinter>;
  enchantmentItemBaseMetadataURISetEvent?: Maybe<EnchantmentItemBaseMetadataUriSetEvent>;
  enchantmentItemBaseMetadataURISetEvents: Array<EnchantmentItemBaseMetadataUriSetEvent>;
  enchantmentItemBurnedEvent?: Maybe<EnchantmentItemBurnedEvent>;
  enchantmentItemBurnedEvents: Array<EnchantmentItemBurnedEvent>;
  enchantmentItemDefinition?: Maybe<EnchantmentItemDefinition>;
  enchantmentItemDefinitions: Array<EnchantmentItemDefinition>;
  enchantmentItemMintedEvent?: Maybe<EnchantmentItemMintedEvent>;
  enchantmentItemMintedEvents: Array<EnchantmentItemMintedEvent>;
  enchantmentItemTransferBatchEvent?: Maybe<EnchantmentItemTransferBatchEvent>;
  enchantmentItemTransferBatchEvents: Array<EnchantmentItemTransferBatchEvent>;
  enchantmentItemTransferSingleEvent?: Maybe<EnchantmentItemTransferSingleEvent>;
  enchantmentItemTransferSingleEvents: Array<EnchantmentItemTransferSingleEvent>;
  enchantmentItemURIEvent?: Maybe<EnchantmentItemUriEvent>;
  enchantmentItemURIEvents: Array<EnchantmentItemUriEvent>;
  layerAddedEvent?: Maybe<LayerAddedEvent>;
  layerAddedEvents: Array<LayerAddedEvent>;
  manualStatusClearedEvent?: Maybe<ManualStatusClearedEvent>;
  manualStatusClearedEvents: Array<ManualStatusClearedEvent>;
  materiaAuthorizedCaller?: Maybe<MateriaAuthorizedCaller>;
  materiaAuthorizedCallers: Array<MateriaAuthorizedCaller>;
  materiaBonus?: Maybe<MateriaBonus>;
  materiaBonuses: Array<MateriaBonus>;
  materiaDefinition?: Maybe<MateriaDefinition>;
  materiaDefinitions: Array<MateriaDefinition>;
  materiaItemApprovalForAllEvent?: Maybe<MateriaItemApprovalForAllEvent>;
  materiaItemApprovalForAllEvents: Array<MateriaItemApprovalForAllEvent>;
  materiaItemAuthorizedConsumer?: Maybe<MateriaItemAuthorizedConsumer>;
  materiaItemAuthorizedConsumers: Array<MateriaItemAuthorizedConsumer>;
  materiaItemAuthorizedMinter?: Maybe<MateriaItemAuthorizedMinter>;
  materiaItemAuthorizedMinters: Array<MateriaItemAuthorizedMinter>;
  materiaItemBaseMetadataURISetEvent?: Maybe<MateriaItemBaseMetadataUriSetEvent>;
  materiaItemBaseMetadataURISetEvents: Array<MateriaItemBaseMetadataUriSetEvent>;
  materiaItemBurnedEvent?: Maybe<MateriaItemBurnedEvent>;
  materiaItemBurnedEvents: Array<MateriaItemBurnedEvent>;
  materiaItemDefinition?: Maybe<MateriaItemDefinition>;
  materiaItemDefinitions: Array<MateriaItemDefinition>;
  materiaItemMintedEvent?: Maybe<MateriaItemMintedEvent>;
  materiaItemMintedEvents: Array<MateriaItemMintedEvent>;
  materiaItemTransferBatchEvent?: Maybe<MateriaItemTransferBatchEvent>;
  materiaItemTransferBatchEvents: Array<MateriaItemTransferBatchEvent>;
  materiaItemTransferSingleEvent?: Maybe<MateriaItemTransferSingleEvent>;
  materiaItemTransferSingleEvents: Array<MateriaItemTransferSingleEvent>;
  materiaItemURIEvent?: Maybe<MateriaItemUriEvent>;
  materiaItemURIEvents: Array<MateriaItemUriEvent>;
  ownershipTransferRecordedEvent?: Maybe<OwnershipTransferRecordedEvent>;
  ownershipTransferRecordedEvents: Array<OwnershipTransferRecordedEvent>;
  ownershipTransferredEvent?: Maybe<OwnershipTransferredEvent>;
  ownershipTransferredEvents: Array<OwnershipTransferredEvent>;
  player?: Maybe<Player>;
  players: Array<Player>;
  plot?: Maybe<Plot>;
  plotCompletion?: Maybe<PlotCompletion>;
  plotCompletions: Array<PlotCompletion>;
  plotDistrict?: Maybe<PlotDistrict>;
  plotDistricts: Array<PlotDistrict>;
  plotHistoryInitializedEvent?: Maybe<PlotHistoryInitializedEvent>;
  plotHistoryInitializedEvents: Array<PlotHistoryInitializedEvent>;
  plotProvenance?: Maybe<PlotProvenance>;
  plotProvenances: Array<PlotProvenance>;
  plotQubiq?: Maybe<PlotQubiq>;
  plotQubiqs: Array<PlotQubiq>;
  plotStats?: Maybe<PlotStats>;
  plotStats_collection: Array<PlotStats>;
  plotStatusInfo?: Maybe<PlotStatusInfo>;
  plotStatusInfos: Array<PlotStatusInfo>;
  plotStatusUpdatedEvent?: Maybe<PlotStatusUpdatedEvent>;
  plotStatusUpdatedEvents: Array<PlotStatusUpdatedEvent>;
  plots: Array<Plot>;
  qubiqContribution?: Maybe<QubiqContribution>;
  qubiqContributions: Array<QubiqContribution>;
  recipeDefinition?: Maybe<RecipeDefinition>;
  recipeDefinitions: Array<RecipeDefinition>;
  recipeDiscoveredEvent?: Maybe<RecipeDiscoveredEvent>;
  recipeDiscoveredEvents: Array<RecipeDiscoveredEvent>;
  transferEvent?: Maybe<TransferEvent>;
  transferEvents: Array<TransferEvent>;
  uintConfigSetEvent?: Maybe<UintConfigSetEvent>;
  uintConfigSetEvents: Array<UintConfigSetEvent>;
  validationHooks?: Maybe<ValidationHooks>;
  validationHooks_collection: Array<ValidationHooks>;
  weaponBonuses?: Maybe<WeaponBonuses>;
  weaponBonuses_collection: Array<WeaponBonuses>;
  weaponDefinition?: Maybe<WeaponDefinition>;
  weaponDefinitions: Array<WeaponDefinition>;
  weaponInstance?: Maybe<WeaponInstance>;
  weaponInstances: Array<WeaponInstance>;
  weaponSockets?: Maybe<WeaponSockets>;
  weaponSockets_collection: Array<WeaponSockets>;
  weaponsPaused?: Maybe<WeaponsPaused>;
  weaponsPauseds: Array<WeaponsPaused>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryAetherUseArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAetherUseRecordedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAetherUseRecordedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<AetherUseRecordedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AetherUseRecordedEvent_Filter>;
};

export type QueryAetherUsesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<AetherUse_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AetherUse_Filter>;
};

export type QueryApprovalEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryApprovalEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ApprovalEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ApprovalEvent_Filter>;
};

export type QueryApprovalForAllEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryApprovalForAllEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ApprovalForAllEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ApprovalForAllEvent_Filter>;
};

export type QueryAuthorizedCallerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAuthorizedCallersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<AuthorizedCaller_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AuthorizedCaller_Filter>;
};

export type QueryAuthorizedMinterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAuthorizedMintersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<AuthorizedMinter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AuthorizedMinter_Filter>;
};

export type QueryBaseUriArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBaseUrIsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BaseUri_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BaseUri_Filter>;
};

export type QueryBlueprintApprovalForAllEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBlueprintApprovalForAllEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BlueprintApprovalForAllEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BlueprintApprovalForAllEvent_Filter>;
};

export type QueryBlueprintAuthorizedConsumerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBlueprintAuthorizedConsumersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BlueprintAuthorizedConsumer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BlueprintAuthorizedConsumer_Filter>;
};

export type QueryBlueprintAuthorizedMinterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBlueprintAuthorizedMintersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BlueprintAuthorizedMinter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BlueprintAuthorizedMinter_Filter>;
};

export type QueryBlueprintBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBlueprintBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BlueprintBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BlueprintBalance_Filter>;
};

export type QueryBlueprintBaseMetadataUriArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBlueprintBaseMetadataUrIsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BlueprintBaseMetadataUri_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BlueprintBaseMetadataUri_Filter>;
};

export type QueryBlueprintBurnEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBlueprintBurnEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BlueprintBurnEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BlueprintBurnEvent_Filter>;
};

export type QueryBlueprintDefinitionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBlueprintDefinitionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BlueprintDefinition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BlueprintDefinition_Filter>;
};

export type QueryBlueprintMintEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBlueprintMintEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BlueprintMintEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BlueprintMintEvent_Filter>;
};

export type QueryBlueprintTransferBatchEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBlueprintTransferBatchEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BlueprintTransferBatchEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BlueprintTransferBatchEvent_Filter>;
};

export type QueryBlueprintTransferSingleEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBlueprintTransferSingleEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BlueprintTransferSingleEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BlueprintTransferSingleEvent_Filter>;
};

export type QueryBlueprintUriEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBlueprintUriEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BlueprintUriEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BlueprintUriEvent_Filter>;
};

export type QueryCityBlueprintsArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityBlueprintsOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityBlueprintsOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityBlueprintsOwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityBlueprintsOwnershipTransferredEvent_Filter>;
};

export type QueryCityBlueprints_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityBlueprints_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityBlueprints_Filter>;
};

export type QueryCityComponentsArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityComponentsOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityComponentsOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityComponentsOwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityComponentsOwnershipTransferredEvent_Filter>;
};

export type QueryCityComponents_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityComponents_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityComponents_Filter>;
};

export type QueryCityConfigAddressEntriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityConfigAddressEntry_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityConfigAddressEntry_Filter>;
};

export type QueryCityConfigAddressEntryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityConfigStateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityConfigStatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityConfigState_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityConfigState_Filter>;
};

export type QueryCityConfigUintEntriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityConfigUintEntry_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityConfigUintEntry_Filter>;
};

export type QueryCityConfigUintEntryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityDistrictsOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityDistrictsOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityDistrictsOwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityDistrictsOwnershipTransferredEvent_Filter>;
};

export type QueryCityEnchantmentItemsOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityEnchantmentItemsOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityEnchantmentItemsOwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityEnchantmentItemsOwnershipTransferredEvent_Filter>;
};

export type QueryCityEnchantmentsOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityEnchantmentsOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityEnchantmentsOwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityEnchantmentsOwnershipTransferredEvent_Filter>;
};

export type QueryCityHistoryOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityHistoryOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityHistoryOwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityHistoryOwnershipTransferredEvent_Filter>;
};

export type QueryCityMateriaItemsOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityMateriaItemsOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityMateriaItemsOwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityMateriaItemsOwnershipTransferredEvent_Filter>;
};

export type QueryCityMateriaOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityMateriaOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityMateriaOwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityMateriaOwnershipTransferredEvent_Filter>;
};

export type QueryCityStatusOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityStatusOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityStatusOwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityStatusOwnershipTransferredEvent_Filter>;
};

export type QueryCityValidationOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityValidationOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityValidationOwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityValidationOwnershipTransferredEvent_Filter>;
};

export type QueryCityWeaponsAddressArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCityWeaponsAddressesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CityWeaponsAddress_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CityWeaponsAddress_Filter>;
};

export type QueryComponentApprovalForAllEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryComponentApprovalForAllEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ComponentApprovalForAllEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ComponentApprovalForAllEvent_Filter>;
};

export type QueryComponentAuthorizedConsumerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryComponentAuthorizedConsumersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ComponentAuthorizedConsumer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ComponentAuthorizedConsumer_Filter>;
};

export type QueryComponentAuthorizedMinterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryComponentAuthorizedMintersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ComponentAuthorizedMinter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ComponentAuthorizedMinter_Filter>;
};

export type QueryComponentBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryComponentBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ComponentBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ComponentBalance_Filter>;
};

export type QueryComponentBaseMetadataUriArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryComponentBaseMetadataUrIsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ComponentBaseMetadataUri_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ComponentBaseMetadataUri_Filter>;
};

export type QueryComponentBurnEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryComponentBurnEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ComponentBurnEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ComponentBurnEvent_Filter>;
};

export type QueryComponentDefinitionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryComponentDefinitionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ComponentDefinition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ComponentDefinition_Filter>;
};

export type QueryComponentMintEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryComponentMintEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ComponentMintEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ComponentMintEvent_Filter>;
};

export type QueryComponentTransferBatchEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryComponentTransferBatchEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ComponentTransferBatchEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ComponentTransferBatchEvent_Filter>;
};

export type QueryComponentTransferSingleEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryComponentTransferSingleEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ComponentTransferSingleEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ComponentTransferSingleEvent_Filter>;
};

export type QueryComponentUriEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryComponentUriEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ComponentUriEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ComponentUriEvent_Filter>;
};

export type QueryConfigInitializedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryConfigInitializedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ConfigInitializedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ConfigInitializedEvent_Filter>;
};

export type QueryConfigOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryConfigOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ConfigOwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ConfigOwnershipTransferredEvent_Filter>;
};

export type QueryCoreAddressSetEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCoreAddressSetEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CoreAddressSetEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CoreAddressSetEvent_Filter>;
};

export type QueryCraftEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCraftEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CraftEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CraftEvent_Filter>;
};

export type QueryCraftingOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCraftingOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CraftingOwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CraftingOwnershipTransferredEvent_Filter>;
};

export type QueryCraftingPausedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCraftingPausedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<CraftingPaused_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CraftingPaused_Filter>;
};

export type QueryDistrictAuthorizedCallerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDistrictAuthorizedCallersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<DistrictAuthorizedCaller_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DistrictAuthorizedCaller_Filter>;
};

export type QueryEnchantmentAuthorizedCallerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEnchantmentAuthorizedCallersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EnchantmentAuthorizedCaller_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnchantmentAuthorizedCaller_Filter>;
};

export type QueryEnchantmentBonusSetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEnchantmentBonusSetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EnchantmentBonusSet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnchantmentBonusSet_Filter>;
};

export type QueryEnchantmentDefinitionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEnchantmentDefinitionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EnchantmentDefinition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnchantmentDefinition_Filter>;
};

export type QueryEnchantmentItemApprovalForAllEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEnchantmentItemApprovalForAllEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EnchantmentItemApprovalForAllEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnchantmentItemApprovalForAllEvent_Filter>;
};

export type QueryEnchantmentItemAuthorizedConsumerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEnchantmentItemAuthorizedConsumersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EnchantmentItemAuthorizedConsumer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnchantmentItemAuthorizedConsumer_Filter>;
};

export type QueryEnchantmentItemAuthorizedMinterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEnchantmentItemAuthorizedMintersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EnchantmentItemAuthorizedMinter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnchantmentItemAuthorizedMinter_Filter>;
};

export type QueryEnchantmentItemBaseMetadataUriSetEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEnchantmentItemBaseMetadataUriSetEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EnchantmentItemBaseMetadataUriSetEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnchantmentItemBaseMetadataUriSetEvent_Filter>;
};

export type QueryEnchantmentItemBurnedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEnchantmentItemBurnedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EnchantmentItemBurnedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnchantmentItemBurnedEvent_Filter>;
};

export type QueryEnchantmentItemDefinitionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEnchantmentItemDefinitionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EnchantmentItemDefinition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnchantmentItemDefinition_Filter>;
};

export type QueryEnchantmentItemMintedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEnchantmentItemMintedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EnchantmentItemMintedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnchantmentItemMintedEvent_Filter>;
};

export type QueryEnchantmentItemTransferBatchEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEnchantmentItemTransferBatchEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EnchantmentItemTransferBatchEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnchantmentItemTransferBatchEvent_Filter>;
};

export type QueryEnchantmentItemTransferSingleEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEnchantmentItemTransferSingleEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EnchantmentItemTransferSingleEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnchantmentItemTransferSingleEvent_Filter>;
};

export type QueryEnchantmentItemUriEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEnchantmentItemUriEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<EnchantmentItemUriEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EnchantmentItemUriEvent_Filter>;
};

export type QueryLayerAddedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLayerAddedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<LayerAddedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LayerAddedEvent_Filter>;
};

export type QueryManualStatusClearedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryManualStatusClearedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ManualStatusClearedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ManualStatusClearedEvent_Filter>;
};

export type QueryMateriaAuthorizedCallerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMateriaAuthorizedCallersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MateriaAuthorizedCaller_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MateriaAuthorizedCaller_Filter>;
};

export type QueryMateriaBonusArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMateriaBonusesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MateriaBonus_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MateriaBonus_Filter>;
};

export type QueryMateriaDefinitionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMateriaDefinitionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MateriaDefinition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MateriaDefinition_Filter>;
};

export type QueryMateriaItemApprovalForAllEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMateriaItemApprovalForAllEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MateriaItemApprovalForAllEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MateriaItemApprovalForAllEvent_Filter>;
};

export type QueryMateriaItemAuthorizedConsumerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMateriaItemAuthorizedConsumersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MateriaItemAuthorizedConsumer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MateriaItemAuthorizedConsumer_Filter>;
};

export type QueryMateriaItemAuthorizedMinterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMateriaItemAuthorizedMintersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MateriaItemAuthorizedMinter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MateriaItemAuthorizedMinter_Filter>;
};

export type QueryMateriaItemBaseMetadataUriSetEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMateriaItemBaseMetadataUriSetEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MateriaItemBaseMetadataUriSetEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MateriaItemBaseMetadataUriSetEvent_Filter>;
};

export type QueryMateriaItemBurnedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMateriaItemBurnedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MateriaItemBurnedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MateriaItemBurnedEvent_Filter>;
};

export type QueryMateriaItemDefinitionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMateriaItemDefinitionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MateriaItemDefinition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MateriaItemDefinition_Filter>;
};

export type QueryMateriaItemMintedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMateriaItemMintedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MateriaItemMintedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MateriaItemMintedEvent_Filter>;
};

export type QueryMateriaItemTransferBatchEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMateriaItemTransferBatchEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MateriaItemTransferBatchEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MateriaItemTransferBatchEvent_Filter>;
};

export type QueryMateriaItemTransferSingleEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMateriaItemTransferSingleEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MateriaItemTransferSingleEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MateriaItemTransferSingleEvent_Filter>;
};

export type QueryMateriaItemUriEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMateriaItemUriEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<MateriaItemUriEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MateriaItemUriEvent_Filter>;
};

export type QueryOwnershipTransferRecordedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryOwnershipTransferRecordedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<OwnershipTransferRecordedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OwnershipTransferRecordedEvent_Filter>;
};

export type QueryOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<OwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OwnershipTransferredEvent_Filter>;
};

export type QueryPlayerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPlayersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Player_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Player_Filter>;
};

export type QueryPlotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPlotCompletionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPlotCompletionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PlotCompletion_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PlotCompletion_Filter>;
};

export type QueryPlotDistrictArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPlotDistrictsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PlotDistrict_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PlotDistrict_Filter>;
};

export type QueryPlotHistoryInitializedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPlotHistoryInitializedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PlotHistoryInitializedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PlotHistoryInitializedEvent_Filter>;
};

export type QueryPlotProvenanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPlotProvenancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PlotProvenance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PlotProvenance_Filter>;
};

export type QueryPlotQubiqArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPlotQubiqsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PlotQubiq_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PlotQubiq_Filter>;
};

export type QueryPlotStatsArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPlotStats_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PlotStats_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PlotStats_Filter>;
};

export type QueryPlotStatusInfoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPlotStatusInfosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PlotStatusInfo_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PlotStatusInfo_Filter>;
};

export type QueryPlotStatusUpdatedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPlotStatusUpdatedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<PlotStatusUpdatedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PlotStatusUpdatedEvent_Filter>;
};

export type QueryPlotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<Plot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Plot_Filter>;
};

export type QueryQubiqContributionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryQubiqContributionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<QubiqContribution_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<QubiqContribution_Filter>;
};

export type QueryRecipeDefinitionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRecipeDefinitionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RecipeDefinition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RecipeDefinition_Filter>;
};

export type QueryRecipeDiscoveredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRecipeDiscoveredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<RecipeDiscoveredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RecipeDiscoveredEvent_Filter>;
};

export type QueryTransferEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTransferEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TransferEvent_Filter>;
};

export type QueryUintConfigSetEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUintConfigSetEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<UintConfigSetEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UintConfigSetEvent_Filter>;
};

export type QueryValidationHooksArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryValidationHooks_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ValidationHooks_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ValidationHooks_Filter>;
};

export type QueryWeaponBonusesArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWeaponBonuses_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WeaponBonuses_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WeaponBonuses_Filter>;
};

export type QueryWeaponDefinitionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWeaponDefinitionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WeaponDefinition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WeaponDefinition_Filter>;
};

export type QueryWeaponInstanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWeaponInstancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WeaponInstance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WeaponInstance_Filter>;
};

export type QueryWeaponSocketsArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWeaponSockets_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WeaponSockets_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WeaponSockets_Filter>;
};

export type QueryWeaponsPausedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"]["input"];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWeaponsPausedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<WeaponsPaused_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WeaponsPaused_Filter>;
};

export type RecipeDefinition = {
  __typename?: "RecipeDefinition";
  enabled: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  outputAmount: Scalars["BigInt"]["output"];
  outputId: Scalars["BigInt"]["output"];
  outputKind: Scalars["Int"]["output"];
  recipeId: Scalars["BigInt"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type RecipeDefinition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RecipeDefinition_Filter>>>;
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  enabled_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<RecipeDefinition_Filter>>>;
  outputAmount?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputAmount_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputAmount_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputAmount_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outputAmount_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputAmount_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputAmount_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputAmount_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outputId?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outputId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  outputId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  outputKind?: InputMaybe<Scalars["Int"]["input"]>;
  outputKind_gt?: InputMaybe<Scalars["Int"]["input"]>;
  outputKind_gte?: InputMaybe<Scalars["Int"]["input"]>;
  outputKind_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  outputKind_lt?: InputMaybe<Scalars["Int"]["input"]>;
  outputKind_lte?: InputMaybe<Scalars["Int"]["input"]>;
  outputKind_not?: InputMaybe<Scalars["Int"]["input"]>;
  outputKind_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  recipeId?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  recipeId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum RecipeDefinition_OrderBy {
  enabled = "enabled",
  id = "id",
  outputAmount = "outputAmount",
  outputId = "outputId",
  outputKind = "outputKind",
  recipeId = "recipeId",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type RecipeDiscoveredEvent = {
  __typename?: "RecipeDiscoveredEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  recipeId: Scalars["BigInt"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
  user: Scalars["Bytes"]["output"];
};

export type RecipeDiscoveredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RecipeDiscoveredEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<RecipeDiscoveredEvent_Filter>>>;
  recipeId?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  recipeId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  recipeId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  user?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  user_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  user_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum RecipeDiscoveredEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  recipeId = "recipeId",
  timestamp = "timestamp",
  txHash = "txHash",
  user = "user",
}

export type TransferEvent = {
  __typename?: "TransferEvent";
  blockNumber: Scalars["BigInt"]["output"];
  from: Scalars["Bytes"]["output"];
  id: Scalars["ID"]["output"];
  timestamp: Scalars["BigInt"]["output"];
  to: Scalars["Bytes"]["output"];
  tokenId: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
};

export type TransferEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TransferEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  from?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  from_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  from_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<TransferEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  to?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  to_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  to_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  tokenId?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tokenId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
};

export enum TransferEvent_OrderBy {
  blockNumber = "blockNumber",
  from = "from",
  id = "id",
  timestamp = "timestamp",
  to = "to",
  tokenId = "tokenId",
  txHash = "txHash",
}

export type UintConfigSetEvent = {
  __typename?: "UintConfigSetEvent";
  blockNumber: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  key: Scalars["Bytes"]["output"];
  keyLabel?: Maybe<Scalars["String"]["output"]>;
  timestamp: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
  value: Scalars["BigInt"]["output"];
};

export type UintConfigSetEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UintConfigSetEvent_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  key?: InputMaybe<Scalars["Bytes"]["input"]>;
  keyLabel?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_contains?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_gt?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_gte?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  keyLabel_lt?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_lte?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  keyLabel_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  keyLabel_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  key_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  key_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  key_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<UintConfigSetEvent_Filter>>>;
  timestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  value?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  value_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  value_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum UintConfigSetEvent_OrderBy {
  blockNumber = "blockNumber",
  id = "id",
  key = "key",
  keyLabel = "keyLabel",
  timestamp = "timestamp",
  txHash = "txHash",
  value = "value",
}

export type ValidationHooks = {
  __typename?: "ValidationHooks";
  cityLand: Scalars["String"]["output"];
  cityStatus: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  updatedAtBlock: Scalars["String"]["output"];
  updatedAtTimestamp: Scalars["String"]["output"];
};

export type ValidationHooks_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ValidationHooks_Filter>>>;
  cityLand?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_contains?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_gt?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_gte?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  cityLand_lt?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_lte?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_not?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  cityLand_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  cityLand_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_contains?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_gt?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_gte?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  cityStatus_lt?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_lte?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_not?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  cityStatus_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  cityStatus_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<ValidationHooks_Filter>>>;
  updatedAtBlock?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_contains?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  updatedAtBlock_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  updatedAtBlock_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtBlock_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp_contains?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp_not_contains_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  updatedAtTimestamp_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp_not_ends_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  updatedAtTimestamp_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  updatedAtTimestamp_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  updatedAtTimestamp_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
};

export enum ValidationHooks_OrderBy {
  cityLand = "cityLand",
  cityStatus = "cityStatus",
  id = "id",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type WeaponBonuses = {
  __typename?: "WeaponBonuses";
  accuracyBpsBonus: Scalars["BigInt"]["output"];
  aoeRadiusBonus: Scalars["BigInt"]["output"];
  armorPenBpsBonus: Scalars["BigInt"]["output"];
  attackSpeedBonus: Scalars["BigInt"]["output"];
  blockChanceBpsBonus: Scalars["BigInt"]["output"];
  cooldownMsBonus: Scalars["BigInt"]["output"];
  critChanceBpsBonus: Scalars["BigInt"]["output"];
  critMultiplierBpsBonus: Scalars["BigInt"]["output"];
  enchantmentSlotsBonus: Scalars["BigInt"]["output"];
  energyCostBonus: Scalars["BigInt"]["output"];
  heatGenerationBonus: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  lifeStealBpsBonus: Scalars["BigInt"]["output"];
  materiaSlotsBonus: Scalars["BigInt"]["output"];
  maxDamageBonus: Scalars["BigInt"]["output"];
  maxDurabilityBonus: Scalars["BigInt"]["output"];
  minDamageBonus: Scalars["BigInt"]["output"];
  projectileSpeedBonus: Scalars["BigInt"]["output"];
  rangeBonus: Scalars["BigInt"]["output"];
  stabilityBonus: Scalars["BigInt"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
  weapon: WeaponInstance;
};

export type WeaponBonuses_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accuracyBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  accuracyBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<WeaponBonuses_Filter>>>;
  aoeRadiusBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  aoeRadiusBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadiusBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  armorPenBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  armorPenBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  attackSpeedBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  attackSpeedBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeedBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockChanceBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockChanceBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  cooldownMsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  cooldownMsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critChanceBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critChanceBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critMultiplierBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critMultiplierBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  enchantmentSlotsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  enchantmentSlotsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlotsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  energyCostBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  energyCostBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCostBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  heatGenerationBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  heatGenerationBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGenerationBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  lifeStealBpsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lifeStealBpsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBpsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  materiaSlotsBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  materiaSlotsBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlotsBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDamageBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDamageBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamageBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDurabilityBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDurabilityBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurabilityBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  minDamageBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  minDamageBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamageBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<WeaponBonuses_Filter>>>;
  projectileSpeedBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  projectileSpeedBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeedBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rangeBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rangeBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  rangeBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  stabilityBonus?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  stabilityBonus_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  stabilityBonus_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  weapon?: InputMaybe<Scalars["String"]["input"]>;
  weapon_?: InputMaybe<WeaponInstance_Filter>;
  weapon_contains?: InputMaybe<Scalars["String"]["input"]>;
  weapon_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  weapon_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  weapon_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  weapon_gt?: InputMaybe<Scalars["String"]["input"]>;
  weapon_gte?: InputMaybe<Scalars["String"]["input"]>;
  weapon_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  weapon_lt?: InputMaybe<Scalars["String"]["input"]>;
  weapon_lte?: InputMaybe<Scalars["String"]["input"]>;
  weapon_not?: InputMaybe<Scalars["String"]["input"]>;
  weapon_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  weapon_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  weapon_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  weapon_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  weapon_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  weapon_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  weapon_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  weapon_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  weapon_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum WeaponBonuses_OrderBy {
  accuracyBpsBonus = "accuracyBpsBonus",
  aoeRadiusBonus = "aoeRadiusBonus",
  armorPenBpsBonus = "armorPenBpsBonus",
  attackSpeedBonus = "attackSpeedBonus",
  blockChanceBpsBonus = "blockChanceBpsBonus",
  cooldownMsBonus = "cooldownMsBonus",
  critChanceBpsBonus = "critChanceBpsBonus",
  critMultiplierBpsBonus = "critMultiplierBpsBonus",
  enchantmentSlotsBonus = "enchantmentSlotsBonus",
  energyCostBonus = "energyCostBonus",
  heatGenerationBonus = "heatGenerationBonus",
  id = "id",
  lifeStealBpsBonus = "lifeStealBpsBonus",
  materiaSlotsBonus = "materiaSlotsBonus",
  maxDamageBonus = "maxDamageBonus",
  maxDurabilityBonus = "maxDurabilityBonus",
  minDamageBonus = "minDamageBonus",
  projectileSpeedBonus = "projectileSpeedBonus",
  rangeBonus = "rangeBonus",
  stabilityBonus = "stabilityBonus",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
  weapon = "weapon",
  weapon__blockNumber = "weapon__blockNumber",
  weapon__craftSeed = "weapon__craftSeed",
  weapon__craftedAt = "weapon__craftedAt",
  weapon__durability = "weapon__durability",
  weapon__frameTier = "weapon__frameTier",
  weapon__genesisEra = "weapon__genesisEra",
  weapon__id = "weapon__id",
  weapon__metadataRevision = "weapon__metadataRevision",
  weapon__originDistrictKind = "weapon__originDistrictKind",
  weapon__originFaction = "weapon__originFaction",
  weapon__originPlotId = "weapon__originPlotId",
  weapon__provenanceHash = "weapon__provenanceHash",
  weapon__rarityTier = "weapon__rarityTier",
  weapon__resonanceType = "weapon__resonanceType",
  weapon__tokenId = "weapon__tokenId",
  weapon__txHash = "weapon__txHash",
  weapon__upgradeLevel = "weapon__upgradeLevel",
  weapon__usedAether = "weapon__usedAether",
  weapon__visualVariant = "weapon__visualVariant",
}

export type WeaponDefinition = {
  __typename?: "WeaponDefinition";
  accuracyBps: Scalars["BigInt"]["output"];
  aoeRadius: Scalars["BigInt"]["output"];
  armorPenBps: Scalars["BigInt"]["output"];
  attackSpeed: Scalars["BigInt"]["output"];
  blockChanceBps: Scalars["BigInt"]["output"];
  classId: Scalars["Int"]["output"];
  cooldownMs: Scalars["BigInt"]["output"];
  createdAtBlock: Scalars["BigInt"]["output"];
  createdAtTimestamp: Scalars["BigInt"]["output"];
  critChanceBps: Scalars["BigInt"]["output"];
  critMultiplierBps: Scalars["BigInt"]["output"];
  damageTypeId: Scalars["Int"]["output"];
  enabled: Scalars["Boolean"]["output"];
  enchantmentSlots: Scalars["BigInt"]["output"];
  energyCost: Scalars["BigInt"]["output"];
  familySetId: Scalars["BigInt"]["output"];
  heatGeneration: Scalars["BigInt"]["output"];
  id: Scalars["ID"]["output"];
  lifeStealBps: Scalars["BigInt"]["output"];
  materiaSlots: Scalars["BigInt"]["output"];
  maxDamage: Scalars["BigInt"]["output"];
  maxDurability: Scalars["BigInt"]["output"];
  maxUpgradeLevel: Scalars["BigInt"]["output"];
  minDamage: Scalars["BigInt"]["output"];
  name: Scalars["String"]["output"];
  projectileSpeed: Scalars["BigInt"]["output"];
  range: Scalars["BigInt"]["output"];
  requiredLevel: Scalars["BigInt"]["output"];
  requiredTechTier: Scalars["BigInt"]["output"];
  stability: Scalars["BigInt"]["output"];
  techTier: Scalars["BigInt"]["output"];
  visualVariant: Scalars["BigInt"]["output"];
  weaponDefinitionId: Scalars["BigInt"]["output"];
};

export type WeaponDefinition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  accuracyBps?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBps_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBps_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBps_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  accuracyBps_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBps_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBps_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  accuracyBps_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  and?: InputMaybe<Array<InputMaybe<WeaponDefinition_Filter>>>;
  aoeRadius?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadius_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadius_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadius_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  aoeRadius_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadius_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadius_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  aoeRadius_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  armorPenBps?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBps_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBps_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBps_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  armorPenBps_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBps_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBps_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  armorPenBps_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  attackSpeed?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeed_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeed_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeed_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  attackSpeed_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeed_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeed_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  attackSpeed_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockChanceBps?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBps_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBps_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBps_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockChanceBps_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBps_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBps_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockChanceBps_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  classId?: InputMaybe<Scalars["Int"]["input"]>;
  classId_gt?: InputMaybe<Scalars["Int"]["input"]>;
  classId_gte?: InputMaybe<Scalars["Int"]["input"]>;
  classId_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  classId_lt?: InputMaybe<Scalars["Int"]["input"]>;
  classId_lte?: InputMaybe<Scalars["Int"]["input"]>;
  classId_not?: InputMaybe<Scalars["Int"]["input"]>;
  classId_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  cooldownMs?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMs_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMs_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMs_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  cooldownMs_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMs_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMs_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  cooldownMs_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critChanceBps?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBps_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBps_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBps_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critChanceBps_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBps_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBps_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  critChanceBps_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critMultiplierBps?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBps_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBps_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBps_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  critMultiplierBps_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBps_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBps_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  critMultiplierBps_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  damageTypeId?: InputMaybe<Scalars["Int"]["input"]>;
  damageTypeId_gt?: InputMaybe<Scalars["Int"]["input"]>;
  damageTypeId_gte?: InputMaybe<Scalars["Int"]["input"]>;
  damageTypeId_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  damageTypeId_lt?: InputMaybe<Scalars["Int"]["input"]>;
  damageTypeId_lte?: InputMaybe<Scalars["Int"]["input"]>;
  damageTypeId_not?: InputMaybe<Scalars["Int"]["input"]>;
  damageTypeId_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  enabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  enabled_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  enabled_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  enchantmentSlots?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlots_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlots_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlots_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  enchantmentSlots_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlots_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlots_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  enchantmentSlots_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  energyCost?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCost_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCost_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCost_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  energyCost_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCost_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCost_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  energyCost_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  familySetId?: InputMaybe<Scalars["BigInt"]["input"]>;
  familySetId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  familySetId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  familySetId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  familySetId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  familySetId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  familySetId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  familySetId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  heatGeneration?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGeneration_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGeneration_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGeneration_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  heatGeneration_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGeneration_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGeneration_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  heatGeneration_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  lifeStealBps?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBps_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBps_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBps_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  lifeStealBps_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBps_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBps_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  lifeStealBps_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  materiaSlots?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlots_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlots_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlots_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  materiaSlots_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlots_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlots_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  materiaSlots_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDamage?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamage_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamage_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamage_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDamage_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamage_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamage_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDamage_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDurability?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurability_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurability_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurability_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxDurability_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurability_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurability_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxDurability_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxUpgradeLevel?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxUpgradeLevel_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxUpgradeLevel_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxUpgradeLevel_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  maxUpgradeLevel_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxUpgradeLevel_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxUpgradeLevel_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  maxUpgradeLevel_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  minDamage?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamage_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamage_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamage_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  minDamage_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamage_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamage_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  minDamage_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_gt?: InputMaybe<Scalars["String"]["input"]>;
  name_gte?: InputMaybe<Scalars["String"]["input"]>;
  name_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_lt?: InputMaybe<Scalars["String"]["input"]>;
  name_lte?: InputMaybe<Scalars["String"]["input"]>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<WeaponDefinition_Filter>>>;
  projectileSpeed?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeed_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeed_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeed_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  projectileSpeed_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeed_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeed_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  projectileSpeed_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  range?: InputMaybe<Scalars["BigInt"]["input"]>;
  range_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  range_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  range_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  range_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  range_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  range_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  range_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  requiredLevel?: InputMaybe<Scalars["BigInt"]["input"]>;
  requiredLevel_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  requiredLevel_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  requiredLevel_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  requiredLevel_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  requiredLevel_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  requiredLevel_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  requiredLevel_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  requiredTechTier?: InputMaybe<Scalars["BigInt"]["input"]>;
  requiredTechTier_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  requiredTechTier_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  requiredTechTier_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  requiredTechTier_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  requiredTechTier_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  requiredTechTier_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  requiredTechTier_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  stability?: InputMaybe<Scalars["BigInt"]["input"]>;
  stability_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  stability_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  stability_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  stability_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  stability_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  stability_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  stability_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  techTier?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  techTier_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  techTier_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  visualVariant?: InputMaybe<Scalars["BigInt"]["input"]>;
  visualVariant_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  visualVariant_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  visualVariant_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  visualVariant_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  visualVariant_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  visualVariant_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  visualVariant_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  weaponDefinitionId?: InputMaybe<Scalars["BigInt"]["input"]>;
  weaponDefinitionId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  weaponDefinitionId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  weaponDefinitionId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  weaponDefinitionId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  weaponDefinitionId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  weaponDefinitionId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  weaponDefinitionId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum WeaponDefinition_OrderBy {
  accuracyBps = "accuracyBps",
  aoeRadius = "aoeRadius",
  armorPenBps = "armorPenBps",
  attackSpeed = "attackSpeed",
  blockChanceBps = "blockChanceBps",
  classId = "classId",
  cooldownMs = "cooldownMs",
  createdAtBlock = "createdAtBlock",
  createdAtTimestamp = "createdAtTimestamp",
  critChanceBps = "critChanceBps",
  critMultiplierBps = "critMultiplierBps",
  damageTypeId = "damageTypeId",
  enabled = "enabled",
  enchantmentSlots = "enchantmentSlots",
  energyCost = "energyCost",
  familySetId = "familySetId",
  heatGeneration = "heatGeneration",
  id = "id",
  lifeStealBps = "lifeStealBps",
  materiaSlots = "materiaSlots",
  maxDamage = "maxDamage",
  maxDurability = "maxDurability",
  maxUpgradeLevel = "maxUpgradeLevel",
  minDamage = "minDamage",
  name = "name",
  projectileSpeed = "projectileSpeed",
  range = "range",
  requiredLevel = "requiredLevel",
  requiredTechTier = "requiredTechTier",
  stability = "stability",
  techTier = "techTier",
  visualVariant = "visualVariant",
  weaponDefinitionId = "weaponDefinitionId",
}

export type WeaponInstance = {
  __typename?: "WeaponInstance";
  blockNumber: Scalars["BigInt"]["output"];
  craftSeed: Scalars["Bytes"]["output"];
  craftedAt: Scalars["BigInt"]["output"];
  durability: Scalars["BigInt"]["output"];
  frameTier: Scalars["BigInt"]["output"];
  genesisEra: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  metadataRevision: Scalars["BigInt"]["output"];
  originDistrictKind: Scalars["BigInt"]["output"];
  originFaction: Scalars["BigInt"]["output"];
  originPlotId: Scalars["BigInt"]["output"];
  owner: Player;
  provenanceHash: Scalars["Bytes"]["output"];
  rarityTier: Scalars["BigInt"]["output"];
  resonanceType: Scalars["Int"]["output"];
  tokenId: Scalars["BigInt"]["output"];
  txHash: Scalars["Bytes"]["output"];
  upgradeLevel: Scalars["BigInt"]["output"];
  usedAether: Scalars["Boolean"]["output"];
  visualVariant: Scalars["BigInt"]["output"];
  weaponDefinition: WeaponDefinition;
};

export type WeaponInstance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<WeaponInstance_Filter>>>;
  blockNumber?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  blockNumber_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  blockNumber_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  craftSeed?: InputMaybe<Scalars["Bytes"]["input"]>;
  craftSeed_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  craftSeed_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  craftSeed_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  craftSeed_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  craftSeed_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  craftSeed_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  craftSeed_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  craftSeed_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  craftSeed_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  craftedAt?: InputMaybe<Scalars["BigInt"]["input"]>;
  craftedAt_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  craftedAt_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  craftedAt_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  craftedAt_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  craftedAt_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  craftedAt_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  craftedAt_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  durability?: InputMaybe<Scalars["BigInt"]["input"]>;
  durability_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  durability_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  durability_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  durability_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  durability_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  durability_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  durability_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  frameTier?: InputMaybe<Scalars["BigInt"]["input"]>;
  frameTier_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  frameTier_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  frameTier_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  frameTier_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  frameTier_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  frameTier_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  frameTier_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  genesisEra?: InputMaybe<Scalars["Boolean"]["input"]>;
  genesisEra_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  genesisEra_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  genesisEra_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  metadataRevision?: InputMaybe<Scalars["BigInt"]["input"]>;
  metadataRevision_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  metadataRevision_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  metadataRevision_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  metadataRevision_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  metadataRevision_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  metadataRevision_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  metadataRevision_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<WeaponInstance_Filter>>>;
  originDistrictKind?: InputMaybe<Scalars["BigInt"]["input"]>;
  originDistrictKind_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  originDistrictKind_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  originDistrictKind_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  originDistrictKind_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  originDistrictKind_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  originDistrictKind_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  originDistrictKind_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  originFaction?: InputMaybe<Scalars["BigInt"]["input"]>;
  originFaction_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  originFaction_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  originFaction_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  originFaction_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  originFaction_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  originFaction_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  originFaction_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  originPlotId?: InputMaybe<Scalars["BigInt"]["input"]>;
  originPlotId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  originPlotId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  originPlotId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  originPlotId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  originPlotId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  originPlotId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  originPlotId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  owner?: InputMaybe<Scalars["String"]["input"]>;
  owner_?: InputMaybe<Player_Filter>;
  owner_contains?: InputMaybe<Scalars["String"]["input"]>;
  owner_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  owner_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  owner_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  owner_gt?: InputMaybe<Scalars["String"]["input"]>;
  owner_gte?: InputMaybe<Scalars["String"]["input"]>;
  owner_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  owner_lt?: InputMaybe<Scalars["String"]["input"]>;
  owner_lte?: InputMaybe<Scalars["String"]["input"]>;
  owner_not?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  owner_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  owner_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  owner_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  provenanceHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  provenanceHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  provenanceHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  provenanceHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  provenanceHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  provenanceHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  provenanceHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  provenanceHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  provenanceHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  provenanceHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  rarityTier?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  rarityTier_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  rarityTier_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  resonanceType?: InputMaybe<Scalars["Int"]["input"]>;
  resonanceType_gt?: InputMaybe<Scalars["Int"]["input"]>;
  resonanceType_gte?: InputMaybe<Scalars["Int"]["input"]>;
  resonanceType_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  resonanceType_lt?: InputMaybe<Scalars["Int"]["input"]>;
  resonanceType_lte?: InputMaybe<Scalars["Int"]["input"]>;
  resonanceType_not?: InputMaybe<Scalars["Int"]["input"]>;
  resonanceType_not_in?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  tokenId?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  tokenId_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  tokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  txHash?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  txHash_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  txHash_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  upgradeLevel?: InputMaybe<Scalars["BigInt"]["input"]>;
  upgradeLevel_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  upgradeLevel_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  upgradeLevel_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  upgradeLevel_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  upgradeLevel_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  upgradeLevel_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  upgradeLevel_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  usedAether?: InputMaybe<Scalars["Boolean"]["input"]>;
  usedAether_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  usedAether_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  usedAether_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  visualVariant?: InputMaybe<Scalars["BigInt"]["input"]>;
  visualVariant_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  visualVariant_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  visualVariant_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  visualVariant_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  visualVariant_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  visualVariant_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  visualVariant_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  weaponDefinition?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_?: InputMaybe<WeaponDefinition_Filter>;
  weaponDefinition_contains?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_ends_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_gt?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_gte?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  weaponDefinition_lt?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_lte?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_not?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_not_contains_nocase?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_not_ends_with?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_not_ends_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  weaponDefinition_not_in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  weaponDefinition_not_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_not_starts_with_nocase?: InputMaybe<
    Scalars["String"]["input"]
  >;
  weaponDefinition_starts_with?: InputMaybe<Scalars["String"]["input"]>;
  weaponDefinition_starts_with_nocase?: InputMaybe<Scalars["String"]["input"]>;
};

export enum WeaponInstance_OrderBy {
  blockNumber = "blockNumber",
  craftSeed = "craftSeed",
  craftedAt = "craftedAt",
  durability = "durability",
  frameTier = "frameTier",
  genesisEra = "genesisEra",
  id = "id",
  metadataRevision = "metadataRevision",
  originDistrictKind = "originDistrictKind",
  originFaction = "originFaction",
  originPlotId = "originPlotId",
  owner = "owner",
  owner__cityKeyTokenId = "owner__cityKeyTokenId",
  owner__faction = "owner__faction",
  owner__id = "owner__id",
  owner__personalPlotCount = "owner__personalPlotCount",
  provenanceHash = "provenanceHash",
  rarityTier = "rarityTier",
  resonanceType = "resonanceType",
  tokenId = "tokenId",
  txHash = "txHash",
  upgradeLevel = "upgradeLevel",
  usedAether = "usedAether",
  visualVariant = "visualVariant",
  weaponDefinition = "weaponDefinition",
  weaponDefinition__accuracyBps = "weaponDefinition__accuracyBps",
  weaponDefinition__aoeRadius = "weaponDefinition__aoeRadius",
  weaponDefinition__armorPenBps = "weaponDefinition__armorPenBps",
  weaponDefinition__attackSpeed = "weaponDefinition__attackSpeed",
  weaponDefinition__blockChanceBps = "weaponDefinition__blockChanceBps",
  weaponDefinition__classId = "weaponDefinition__classId",
  weaponDefinition__cooldownMs = "weaponDefinition__cooldownMs",
  weaponDefinition__createdAtBlock = "weaponDefinition__createdAtBlock",
  weaponDefinition__createdAtTimestamp = "weaponDefinition__createdAtTimestamp",
  weaponDefinition__critChanceBps = "weaponDefinition__critChanceBps",
  weaponDefinition__critMultiplierBps = "weaponDefinition__critMultiplierBps",
  weaponDefinition__damageTypeId = "weaponDefinition__damageTypeId",
  weaponDefinition__enabled = "weaponDefinition__enabled",
  weaponDefinition__enchantmentSlots = "weaponDefinition__enchantmentSlots",
  weaponDefinition__energyCost = "weaponDefinition__energyCost",
  weaponDefinition__familySetId = "weaponDefinition__familySetId",
  weaponDefinition__heatGeneration = "weaponDefinition__heatGeneration",
  weaponDefinition__id = "weaponDefinition__id",
  weaponDefinition__lifeStealBps = "weaponDefinition__lifeStealBps",
  weaponDefinition__materiaSlots = "weaponDefinition__materiaSlots",
  weaponDefinition__maxDamage = "weaponDefinition__maxDamage",
  weaponDefinition__maxDurability = "weaponDefinition__maxDurability",
  weaponDefinition__maxUpgradeLevel = "weaponDefinition__maxUpgradeLevel",
  weaponDefinition__minDamage = "weaponDefinition__minDamage",
  weaponDefinition__name = "weaponDefinition__name",
  weaponDefinition__projectileSpeed = "weaponDefinition__projectileSpeed",
  weaponDefinition__range = "weaponDefinition__range",
  weaponDefinition__requiredLevel = "weaponDefinition__requiredLevel",
  weaponDefinition__requiredTechTier = "weaponDefinition__requiredTechTier",
  weaponDefinition__stability = "weaponDefinition__stability",
  weaponDefinition__techTier = "weaponDefinition__techTier",
  weaponDefinition__visualVariant = "weaponDefinition__visualVariant",
  weaponDefinition__weaponDefinitionId = "weaponDefinition__weaponDefinitionId",
}

export type WeaponSockets = {
  __typename?: "WeaponSockets";
  id: Scalars["ID"]["output"];
  socketsAddress: Scalars["Bytes"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type WeaponSockets_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<WeaponSockets_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<WeaponSockets_Filter>>>;
  socketsAddress?: InputMaybe<Scalars["Bytes"]["input"]>;
  socketsAddress_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  socketsAddress_gt?: InputMaybe<Scalars["Bytes"]["input"]>;
  socketsAddress_gte?: InputMaybe<Scalars["Bytes"]["input"]>;
  socketsAddress_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  socketsAddress_lt?: InputMaybe<Scalars["Bytes"]["input"]>;
  socketsAddress_lte?: InputMaybe<Scalars["Bytes"]["input"]>;
  socketsAddress_not?: InputMaybe<Scalars["Bytes"]["input"]>;
  socketsAddress_not_contains?: InputMaybe<Scalars["Bytes"]["input"]>;
  socketsAddress_not_in?: InputMaybe<Array<Scalars["Bytes"]["input"]>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum WeaponSockets_OrderBy {
  id = "id",
  socketsAddress = "socketsAddress",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type WeaponsPaused = {
  __typename?: "WeaponsPaused";
  id: Scalars["ID"]["output"];
  paused: Scalars["Boolean"]["output"];
  updatedAtBlock: Scalars["BigInt"]["output"];
  updatedAtTimestamp: Scalars["BigInt"]["output"];
};

export type WeaponsPaused_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<WeaponsPaused_Filter>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  id_gt?: InputMaybe<Scalars["ID"]["input"]>;
  id_gte?: InputMaybe<Scalars["ID"]["input"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  id_lt?: InputMaybe<Scalars["ID"]["input"]>;
  id_lte?: InputMaybe<Scalars["ID"]["input"]>;
  id_not?: InputMaybe<Scalars["ID"]["input"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  or?: InputMaybe<Array<InputMaybe<WeaponsPaused_Filter>>>;
  paused?: InputMaybe<Scalars["Boolean"]["input"]>;
  paused_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  paused_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  paused_not_in?: InputMaybe<Array<Scalars["Boolean"]["input"]>>;
  updatedAtBlock?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtBlock_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_gte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
  updatedAtTimestamp_lt?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_lte?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not?: InputMaybe<Scalars["BigInt"]["input"]>;
  updatedAtTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>;
};

export enum WeaponsPaused_OrderBy {
  id = "id",
  paused = "paused",
  updatedAtBlock = "updatedAtBlock",
  updatedAtTimestamp = "updatedAtTimestamp",
}

export type _Block_ = {
  __typename?: "_Block_";
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]["output"]>;
  /** The block number */
  number: Scalars["Int"]["output"];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars["Bytes"]["output"]>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars["Int"]["output"]>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"]["output"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"]["output"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  deny = "deny",
}

export type CityDashboardQueryVariables = Exact<{ [key: string]: never }>;

export type CityDashboardQuery = {
  __typename?: "Query";
  _meta?: {
    __typename?: "_Meta_";
    block: { __typename?: "_Block_"; number: number };
  } | null;
  weaponDefinitions: Array<{
    __typename?: "WeaponDefinition";
    id: string;
    weaponDefinitionId: string;
    name: string;
    classId: number;
    damageTypeId: number;
    techTier: string;
    minDamage: string;
    maxDamage: string;
    enchantmentSlots: string;
    materiaSlots: string;
    enabled: boolean;
  }>;
  weaponInstances: Array<{
    __typename?: "WeaponInstance";
    id: string;
    tokenId: string;
    rarityTier: string;
    upgradeLevel: string;
    durability: string;
    originPlotId: string;
    owner: { __typename?: "Player"; id: string };
    weaponDefinition: {
      __typename?: "WeaponDefinition";
      id: string;
      name: string;
    };
  }>;
  materiaDefinitions: Array<{
    __typename?: "MateriaDefinition";
    id: string;
    materiaId: string;
    name: string;
    categoryLabel: string;
    elementLabel: string;
    rarityTier: string;
    maxLevel: string;
    enabled: boolean;
  }>;
  plots: Array<{
    __typename?: "Plot";
    id: string;
    plotId: string;
    plotType: string;
    faction: string;
    status: string;
    width: string;
    height: string;
    exists: boolean;
    createdAt: string;
    owner?: { __typename?: "Player"; id: string } | null;
  }>;
  players: Array<{
    __typename?: "Player";
    id: string;
    cityKeyTokenId?: string | null;
    faction?: string | null;
    personalPlotCount: number;
  }>;
  plotStatusInfos: Array<{
    __typename?: "PlotStatusInfo";
    id: string;
    lastActivityAt: string;
    lastMaintenanceAt: string;
    manualStatusOverride: string;
    derivedStatus: string;
    layerEligible: boolean;
    updatedAtBlock: string;
    updatedAtTimestamp: string;
    plot: { __typename?: "Plot"; id: string; plotId: string };
  }>;
  plotProvenances: Array<{
    __typename?: "PlotProvenance";
    id: string;
    firstBuilder?: string | null;
    createdAt?: string | null;
    layerCount: string;
    ownershipTransfers: string;
    aetherUses: string;
    historicScore: string;
    originFaction?: string | null;
    genesisEra: boolean;
    updatedAtBlock: string;
    updatedAtTimestamp: string;
    plot: { __typename?: "Plot"; id: string; plotId: string };
  }>;
};

export type GetPlotsPaginatedQueryVariables = Exact<{
  first: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  orderBy?: InputMaybe<Plot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;

export type GetPlotsPaginatedQuery = {
  __typename?: "Query";
  plots: Array<{
    __typename?: "Plot";
    id: string;
    plotId: string;
    plotType: string;
    faction: string;
    status: string;
    width: string;
    height: string;
    exists: boolean;
    createdAt: string;
    owner?: { __typename?: "Player"; id: string } | null;
  }>;
};

export type GetPlotStatusInfosPaginatedQueryVariables = Exact<{
  first: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  orderBy?: InputMaybe<PlotStatusInfo_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;

export type GetPlotStatusInfosPaginatedQuery = {
  __typename?: "Query";
  plotStatusInfos: Array<{
    __typename?: "PlotStatusInfo";
    id: string;
    lastActivityAt: string;
    lastMaintenanceAt: string;
    manualStatusOverride: string;
    derivedStatus: string;
    layerEligible: boolean;
    updatedAtBlock: string;
    updatedAtTimestamp: string;
    plot: { __typename?: "Plot"; id: string; plotId: string };
  }>;
};

export type GetPlotProvenancesPaginatedQueryVariables = Exact<{
  first: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  orderBy?: InputMaybe<PlotProvenance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;

export type GetPlotProvenancesPaginatedQuery = {
  __typename?: "Query";
  plotProvenances: Array<{
    __typename?: "PlotProvenance";
    id: string;
    firstBuilder?: string | null;
    createdAt?: string | null;
    layerCount: string;
    ownershipTransfers: string;
    aetherUses: string;
    historicScore: string;
    originFaction?: string | null;
    genesisEra: boolean;
    updatedAtBlock: string;
    updatedAtTimestamp: string;
    plot: { __typename?: "Plot"; id: string; plotId: string };
  }>;
};

export type GetPlayerQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetPlayerQuery = {
  __typename?: "Query";
  player?: {
    __typename?: "Player";
    id: string;
    cityKeyTokenId?: string | null;
    faction?: string | null;
    personalPlotCount: number;
  } | null;
};

export type GetPlayersQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetPlayersQuery = {
  __typename?: "Query";
  players: Array<{
    __typename?: "Player";
    id: string;
    cityKeyTokenId?: string | null;
    faction?: string | null;
    personalPlotCount: number;
  }>;
};

export type GetPlotQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetPlotQuery = {
  __typename?: "Query";
  plot?: {
    __typename?: "Plot";
    id: string;
    plotId: string;
    plotType: string;
    faction: string;
    status: string;
    width: string;
    height: string;
    createdAt: string;
    exists: boolean;
    owner?: { __typename?: "Player"; id: string } | null;
  } | null;
};

export type GetPlotsQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetPlotsQuery = {
  __typename?: "Query";
  plots: Array<{
    __typename?: "Plot";
    id: string;
    plotId: string;
    plotType: string;
    faction: string;
    status: string;
    width: string;
    height: string;
    createdAt: string;
    exists: boolean;
    owner?: { __typename?: "Player"; id: string } | null;
  }>;
};

export type GetWeaponDefinitionQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetWeaponDefinitionQuery = {
  __typename?: "Query";
  weaponDefinition?: {
    __typename?: "WeaponDefinition";
    id: string;
    weaponDefinitionId: string;
    name: string;
    classId: number;
    damageTypeId: number;
    techTier: string;
    minDamage: string;
    maxDamage: string;
    enchantmentSlots: string;
    materiaSlots: string;
    enabled: boolean;
  } | null;
};

export type GetWeaponDefinitionsQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetWeaponDefinitionsQuery = {
  __typename?: "Query";
  weaponDefinitions: Array<{
    __typename?: "WeaponDefinition";
    id: string;
    weaponDefinitionId: string;
    name: string;
    classId: number;
    damageTypeId: number;
    techTier: string;
    minDamage: string;
    maxDamage: string;
    enchantmentSlots: string;
    materiaSlots: string;
    enabled: boolean;
  }>;
};

export type GetWeaponInstanceQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetWeaponInstanceQuery = {
  __typename?: "Query";
  weaponInstance?: {
    __typename?: "WeaponInstance";
    id: string;
    tokenId: string;
    rarityTier: string;
    frameTier: string;
    durability: string;
    upgradeLevel: string;
    metadataRevision: string;
    originPlotId: string;
    originFaction: string;
    originDistrictKind: string;
    craftedAt: string;
    visualVariant: string;
    resonanceType: number;
    craftSeed: string;
    provenanceHash: string;
    genesisEra: boolean;
    usedAether: boolean;
    txHash: string;
    blockNumber: string;
    owner: { __typename?: "Player"; id: string };
    weaponDefinition: {
      __typename?: "WeaponDefinition";
      id: string;
      name: string;
    };
  } | null;
};

export type GetWeaponInstancesQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetWeaponInstancesQuery = {
  __typename?: "Query";
  weaponInstances: Array<{
    __typename?: "WeaponInstance";
    id: string;
    tokenId: string;
    rarityTier: string;
    upgradeLevel: string;
    durability: string;
    originPlotId: string;
    owner: { __typename?: "Player"; id: string };
    weaponDefinition: {
      __typename?: "WeaponDefinition";
      id: string;
      name: string;
    };
  }>;
};

export type GetPlotQubiqsQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetPlotQubiqsQuery = {
  __typename?: "Query";
  plotQubiqs: Array<{
    __typename?: "PlotQubiq";
    id: string;
    x: number;
    y: number;
    oilDeposited: string;
    lemonsDeposited: string;
    ironDeposited: string;
    completed: boolean;
    usedAether: boolean;
    lastContributor?: string | null;
    completedAt?: string | null;
    createdAt: string;
    updatedAt: string;
    plot: { __typename?: "Plot"; id: string; plotId: string };
  }>;
};

export type GetAetherUsesQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetAetherUsesQuery = {
  __typename?: "Query";
  aetherUses: Array<{
    __typename?: "AetherUse";
    id: string;
    x: number;
    y: number;
    user: string;
    blockNumber: string;
    timestamp: string;
    txHash: string;
    plot: { __typename?: "Plot"; id: string; plotId: string };
  }>;
};

export type GetPlotCompletionsQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetPlotCompletionsQuery = {
  __typename?: "Query";
  plotCompletions: Array<{
    __typename?: "PlotCompletion";
    id: string;
    blockNumber: string;
    timestamp: string;
    txHash: string;
    plot: { __typename?: "Plot"; id: string; plotId: string };
  }>;
};

export type GetQubiqContributionsQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetQubiqContributionsQuery = {
  __typename?: "Query";
  qubiqContributions: Array<{
    __typename?: "QubiqContribution";
    id: string;
    x: number;
    y: number;
    contributor: string;
    oil: string;
    lemons: string;
    iron: string;
    blockNumber: string;
    timestamp: string;
    txHash: string;
    plot: { __typename?: "Plot"; id: string; plotId: string };
  }>;
};

export type GetOwnershipTransferredEventsQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetOwnershipTransferredEventsQuery = {
  __typename?: "Query";
  ownershipTransferredEvents: Array<{
    __typename?: "OwnershipTransferredEvent";
    id: string;
    previousOwner: string;
    newOwner: string;
    blockNumber: string;
    timestamp: string;
    txHash: string;
  }>;
};

export type GetTransferEventsQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetTransferEventsQuery = {
  __typename?: "Query";
  transferEvents: Array<{
    __typename?: "TransferEvent";
    id: string;
    from: string;
    to: string;
    tokenId: string;
    blockNumber: string;
    timestamp: string;
    txHash: string;
  }>;
};

export type GetApprovalEventsQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetApprovalEventsQuery = {
  __typename?: "Query";
  approvalEvents: Array<{
    __typename?: "ApprovalEvent";
    id: string;
    owner: string;
    approved: string;
    tokenId: string;
    blockNumber: string;
    timestamp: string;
    txHash: string;
  }>;
};

export type GetApprovalForAllEventsQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetApprovalForAllEventsQuery = {
  __typename?: "Query";
  approvalForAllEvents: Array<{
    __typename?: "ApprovalForAllEvent";
    id: string;
    owner: string;
    operator: string;
    approved: boolean;
    blockNumber: string;
    timestamp: string;
    txHash: string;
  }>;
};

export const CityDashboardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CityDashboard" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "_meta" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "block" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "number" },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "weaponDefinitions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "6" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "weaponDefinitionId" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "weaponDefinitionId" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "classId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "damageTypeId" },
                },
                { kind: "Field", name: { kind: "Name", value: "techTier" } },
                { kind: "Field", name: { kind: "Name", value: "minDamage" } },
                { kind: "Field", name: { kind: "Name", value: "maxDamage" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "enchantmentSlots" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "materiaSlots" },
                },
                { kind: "Field", name: { kind: "Name", value: "enabled" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "weaponInstances" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "12" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "tokenId" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "tokenId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "rarityTier" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "upgradeLevel" },
                },
                { kind: "Field", name: { kind: "Name", value: "durability" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "originPlotId" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "weaponDefinition" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "materiaDefinitions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "12" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "materiaId" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "materiaId" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categoryLabel" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "elementLabel" },
                },
                { kind: "Field", name: { kind: "Name", value: "rarityTier" } },
                { kind: "Field", name: { kind: "Name", value: "maxLevel" } },
                { kind: "Field", name: { kind: "Name", value: "enabled" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "plots" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "24" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "plotId" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "plotId" } },
                { kind: "Field", name: { kind: "Name", value: "plotType" } },
                { kind: "Field", name: { kind: "Name", value: "faction" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "width" } },
                { kind: "Field", name: { kind: "Name", value: "height" } },
                { kind: "Field", name: { kind: "Name", value: "exists" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "players" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "12" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "id" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "cityKeyTokenId" },
                },
                { kind: "Field", name: { kind: "Name", value: "faction" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "personalPlotCount" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "plotStatusInfos" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "24" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "id" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "plot" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plotId" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastActivityAt" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastMaintenanceAt" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "manualStatusOverride" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "derivedStatus" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "layerEligible" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updatedAtBlock" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updatedAtTimestamp" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "plotProvenances" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "24" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "id" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "plot" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plotId" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firstBuilder" },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "layerCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "ownershipTransfers" },
                },
                { kind: "Field", name: { kind: "Name", value: "aetherUses" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "historicScore" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "originFaction" },
                },
                { kind: "Field", name: { kind: "Name", value: "genesisEra" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updatedAtBlock" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updatedAtTimestamp" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CityDashboardQuery, CityDashboardQueryVariables>;
export const GetPlotsPaginatedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPlotsPaginated" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderBy" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "Plot_orderBy" },
          },
          defaultValue: { kind: "EnumValue", value: "plotId" },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderDirection" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderDirection" },
          },
          defaultValue: { kind: "EnumValue", value: "asc" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "plots" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "orderBy" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "orderDirection" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "plotId" } },
                { kind: "Field", name: { kind: "Name", value: "plotType" } },
                { kind: "Field", name: { kind: "Name", value: "faction" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "width" } },
                { kind: "Field", name: { kind: "Name", value: "height" } },
                { kind: "Field", name: { kind: "Name", value: "exists" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPlotsPaginatedQuery,
  GetPlotsPaginatedQueryVariables
>;
export const GetPlotStatusInfosPaginatedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPlotStatusInfosPaginated" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderBy" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "PlotStatusInfo_orderBy" },
          },
          defaultValue: { kind: "EnumValue", value: "id" },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderDirection" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderDirection" },
          },
          defaultValue: { kind: "EnumValue", value: "asc" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "plotStatusInfos" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "orderBy" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "orderDirection" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "plot" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plotId" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastActivityAt" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastMaintenanceAt" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "manualStatusOverride" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "derivedStatus" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "layerEligible" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updatedAtBlock" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updatedAtTimestamp" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPlotStatusInfosPaginatedQuery,
  GetPlotStatusInfosPaginatedQueryVariables
>;
export const GetPlotProvenancesPaginatedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPlotProvenancesPaginated" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderBy" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "PlotProvenance_orderBy" },
          },
          defaultValue: { kind: "EnumValue", value: "id" },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderDirection" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OrderDirection" },
          },
          defaultValue: { kind: "EnumValue", value: "asc" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "plotProvenances" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "orderBy" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "orderDirection" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "plot" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plotId" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firstBuilder" },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "layerCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "ownershipTransfers" },
                },
                { kind: "Field", name: { kind: "Name", value: "aetherUses" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "historicScore" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "originFaction" },
                },
                { kind: "Field", name: { kind: "Name", value: "genesisEra" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updatedAtBlock" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updatedAtTimestamp" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPlotProvenancesPaginatedQuery,
  GetPlotProvenancesPaginatedQueryVariables
>;
export const GetPlayerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPlayer" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "player" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "cityKeyTokenId" },
                },
                { kind: "Field", name: { kind: "Name", value: "faction" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "personalPlotCount" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPlayerQuery, GetPlayerQueryVariables>;
export const GetPlayersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPlayers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "50" },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "0" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "players" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "id" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "cityKeyTokenId" },
                },
                { kind: "Field", name: { kind: "Name", value: "faction" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "personalPlotCount" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPlayersQuery, GetPlayersQueryVariables>;
export const GetPlotDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPlot" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "plot" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "plotId" } },
                { kind: "Field", name: { kind: "Name", value: "plotType" } },
                { kind: "Field", name: { kind: "Name", value: "faction" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "width" } },
                { kind: "Field", name: { kind: "Name", value: "height" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "exists" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPlotQuery, GetPlotQueryVariables>;
export const GetPlotsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPlots" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "50" },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "0" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "plots" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "plotId" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "plotId" } },
                { kind: "Field", name: { kind: "Name", value: "plotType" } },
                { kind: "Field", name: { kind: "Name", value: "faction" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "width" } },
                { kind: "Field", name: { kind: "Name", value: "height" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "exists" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPlotsQuery, GetPlotsQueryVariables>;
export const GetWeaponDefinitionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetWeaponDefinition" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "weaponDefinition" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "weaponDefinitionId" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "classId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "damageTypeId" },
                },
                { kind: "Field", name: { kind: "Name", value: "techTier" } },
                { kind: "Field", name: { kind: "Name", value: "minDamage" } },
                { kind: "Field", name: { kind: "Name", value: "maxDamage" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "enchantmentSlots" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "materiaSlots" },
                },
                { kind: "Field", name: { kind: "Name", value: "enabled" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetWeaponDefinitionQuery,
  GetWeaponDefinitionQueryVariables
>;
export const GetWeaponDefinitionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetWeaponDefinitions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "50" },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "0" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "weaponDefinitions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "weaponDefinitionId" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "weaponDefinitionId" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "classId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "damageTypeId" },
                },
                { kind: "Field", name: { kind: "Name", value: "techTier" } },
                { kind: "Field", name: { kind: "Name", value: "minDamage" } },
                { kind: "Field", name: { kind: "Name", value: "maxDamage" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "enchantmentSlots" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "materiaSlots" },
                },
                { kind: "Field", name: { kind: "Name", value: "enabled" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetWeaponDefinitionsQuery,
  GetWeaponDefinitionsQueryVariables
>;
export const GetWeaponInstanceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetWeaponInstance" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "weaponInstance" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "tokenId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "weaponDefinition" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "rarityTier" } },
                { kind: "Field", name: { kind: "Name", value: "frameTier" } },
                { kind: "Field", name: { kind: "Name", value: "durability" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "upgradeLevel" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "metadataRevision" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "originPlotId" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "originFaction" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "originDistrictKind" },
                },
                { kind: "Field", name: { kind: "Name", value: "craftedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "visualVariant" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "resonanceType" },
                },
                { kind: "Field", name: { kind: "Name", value: "craftSeed" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "provenanceHash" },
                },
                { kind: "Field", name: { kind: "Name", value: "genesisEra" } },
                { kind: "Field", name: { kind: "Name", value: "usedAether" } },
                { kind: "Field", name: { kind: "Name", value: "txHash" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetWeaponInstanceQuery,
  GetWeaponInstanceQueryVariables
>;
export const GetWeaponInstancesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetWeaponInstances" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "50" },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "0" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "weaponInstances" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "tokenId" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "asc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "tokenId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "rarityTier" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "upgradeLevel" },
                },
                { kind: "Field", name: { kind: "Name", value: "durability" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "originPlotId" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "weaponDefinition" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetWeaponInstancesQuery,
  GetWeaponInstancesQueryVariables
>;
export const GetPlotQubiqsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPlotQubiqs" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "100" },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "0" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "plotQubiqs" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "plot" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plotId" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "x" } },
                { kind: "Field", name: { kind: "Name", value: "y" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "oilDeposited" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lemonsDeposited" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "ironDeposited" },
                },
                { kind: "Field", name: { kind: "Name", value: "completed" } },
                { kind: "Field", name: { kind: "Name", value: "usedAether" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastContributor" },
                },
                { kind: "Field", name: { kind: "Name", value: "completedAt" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPlotQubiqsQuery, GetPlotQubiqsQueryVariables>;
export const GetAetherUsesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAetherUses" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "100" },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "0" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "aetherUses" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "timestamp" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "desc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "plot" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plotId" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "x" } },
                { kind: "Field", name: { kind: "Name", value: "y" } },
                { kind: "Field", name: { kind: "Name", value: "user" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "txHash" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAetherUsesQuery, GetAetherUsesQueryVariables>;
export const GetPlotCompletionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPlotCompletions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "100" },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "0" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "plotCompletions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "timestamp" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "desc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "plot" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plotId" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "txHash" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPlotCompletionsQuery,
  GetPlotCompletionsQueryVariables
>;
export const GetQubiqContributionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetQubiqContributions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "100" },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "0" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "qubiqContributions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "timestamp" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "desc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "plot" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plotId" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "x" } },
                { kind: "Field", name: { kind: "Name", value: "y" } },
                { kind: "Field", name: { kind: "Name", value: "contributor" } },
                { kind: "Field", name: { kind: "Name", value: "oil" } },
                { kind: "Field", name: { kind: "Name", value: "lemons" } },
                { kind: "Field", name: { kind: "Name", value: "iron" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "txHash" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetQubiqContributionsQuery,
  GetQubiqContributionsQueryVariables
>;
export const GetOwnershipTransferredEventsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetOwnershipTransferredEvents" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "100" },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "0" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ownershipTransferredEvents" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "timestamp" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "desc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "previousOwner" },
                },
                { kind: "Field", name: { kind: "Name", value: "newOwner" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "txHash" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetOwnershipTransferredEventsQuery,
  GetOwnershipTransferredEventsQueryVariables
>;
export const GetTransferEventsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetTransferEvents" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "100" },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "0" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "transferEvents" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "timestamp" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "desc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "from" } },
                { kind: "Field", name: { kind: "Name", value: "to" } },
                { kind: "Field", name: { kind: "Name", value: "tokenId" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "txHash" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetTransferEventsQuery,
  GetTransferEventsQueryVariables
>;
export const GetApprovalEventsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetApprovalEvents" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "100" },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "0" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "approvalEvents" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "timestamp" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "desc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "owner" } },
                { kind: "Field", name: { kind: "Name", value: "approved" } },
                { kind: "Field", name: { kind: "Name", value: "tokenId" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "txHash" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetApprovalEventsQuery,
  GetApprovalEventsQueryVariables
>;
export const GetApprovalForAllEventsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetApprovalForAllEvents" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "100" },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "0" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "approvalForAllEvents" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "EnumValue", value: "timestamp" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "EnumValue", value: "desc" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "owner" } },
                { kind: "Field", name: { kind: "Name", value: "operator" } },
                { kind: "Field", name: { kind: "Name", value: "approved" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "txHash" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetApprovalForAllEventsQuery,
  GetApprovalForAllEventsQueryVariables
>;
