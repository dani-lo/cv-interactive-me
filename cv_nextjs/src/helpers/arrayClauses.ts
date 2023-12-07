import { Model } from "../models/model";
import { Annotation, Bookmark, Filter, ResourceType } from "../types";

export const findClause = (
    target: Model,
    resource_type: ResourceType
) => (item: Bookmark | Annotation | Filter) => item.resource_id == target.id && item.resource_type == resource_type

export const filterClause = (
    target: Model,
    resource_type: ResourceType
) => (item: Bookmark | Annotation | Filter) => item.resource_id != target.id && item.resource_type == resource_type

