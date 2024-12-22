import { Token } from "@typed-gql/lexer";

export type Document = Definition[];

export type ExecutableDocument = ExecutableDefinition[];

export type TypeSystemDocument = TypeSystemDefinition[];

export type TypeSystemExtensionDocument = TypeSystemDefinitionOrExtension[];

export type Definition = ExecutableDefinition | TypeSystemDefinitionOrExtension;

export interface ExecutableDefinitionBase {
  type: "executable";
}

export interface OperationDefinition extends ExecutableDefinitionBase {
  subType: "operation";
  operationType?: OperationType;
  name?: string;
  variableDefinitions?: VariableDefinitions;
  directives?: Directives;
  selectionSet: SelectionSet;
}

export type OperationType = "query" | "mutation" | "subscription";

export type SelectionSet = Selection[];

export type Selection = Field | FragmentSpread | InlineFragment;

export interface Field {
  type: "field";
  alias?: string;
  name: string;
  arguments?: Arguments;
  directives?: Directives;
  selectionSet?: SelectionSet;
}

export type Arguments = Argument[];

export interface Argument {
  name: string;
  value: Value;
}

export interface FragmentSpread {
  type: "fragmentSpread";
  name: string;
  directives?: Directives;
}

export interface InlineFragment {
  type: "inlineFragment";
  typeCondition?: string;
  directives?: Directives;
  selectionSet: SelectionSet;
}

export interface FragmentDefinition extends ExecutableDefinitionBase {
  subType: "fragment";
  name: string;
  typeCondition: string;
  directives?: Directives;
  selectionSet: SelectionSet;
}

export type Value =
  | Variable
  | IntValue
  | FloatValue
  | StringValue
  | BooleanValue
  | NullValue
  | EnumValue
  | ListValue
  | ObjectValue;

export interface Variable {
  type: "variable";
  name: string;
}

export interface IntValue {
  type: "int";
  value: number;
}

export interface FloatValue {
  type: "float";
  value: number;
}

export interface StringValue {
  type: "string";
  value: string;
}

export interface BooleanValue {
  type: "boolean";
  value: boolean;
}

export interface NullValue {
  type: "null";
}

export interface EnumValue {
  type: "enum";
  value: string;
}

export interface ListValue {
  type: "list";
  values: Value[];
}

export interface ObjectValue {
  type: "object";
  value: Partial<Record<string, Value>>;
}

export type VariableDefinitions = VariableDefinition[];

export interface VariableDefinition {
  variable: string;
  type: Type;
  defaultValue?: Value;
  directives?: Directives;
}

export type Type = NamedType | ListType | NonNullType;

export interface NamedType {
  type: "named";
  name: string;
}

export interface ListType {
  type: "list";
  element: Type;
}

export interface NonNullType {
  type: "nonNull";
  element: NamedType | ListType;
}

export type Directives = Directive[];

export interface Directive {
  name: string;
  arguments: Arguments;
}

export type ExecutableDefinition = OperationDefinition | FragmentDefinition;

export interface TypeSystemDefinitionOrExtensionBase {
  type: "typeSystem";
}

export interface TypeSystemDefinitionBase
  extends TypeSystemDefinitionOrExtensionBase {
  subType: "definition";
}

export interface SchemaDefinition extends TypeSystemDefinitionBase {
  definitionType: "schema";
  description?: string;
  directives?: Directives;
  rootOperationTypeDefinition: RootOperationTypeDefinition[];
}

export interface RootOperationTypeDefinition {
  operationType: OperationType;
  type: string;
}

export interface TypeDefinitionBase extends TypeSystemDefinitionBase {
  definitionType: "type";
}

export interface ScalarTypeDefinition extends TypeDefinitionBase {
  typeType: "scalar";
  description?: string;
  name: string;
  directives?: Directives;
}

export interface ObjectTypeDefinition extends TypeDefinitionBase {
  typeType: "object";
  description?: string;
  name: string;
  implementsInterfaces?: string[];
  directives?: Directives;
  fieldsDefinition: FieldsDefinition;
}

export type FieldsDefinition = FieldDefinition[];

export interface FieldDefinition {
  description?: string;
  name: string;
  argumentsDefinition?: ArgumentsDefinition;
  type: Type;
  directives?: Directives;
}

export type ArgumentsDefinition = InputValueDefinition[];

export interface InputValueDefinition {
  description?: string;
  name: string;
  type: Type;
  defaultValue?: Value;
  directives?: Directives;
}

export interface InterfaceTypeDefinition extends TypeDefinitionBase {
  typeType: "interface";
  description?: string;
  name: string;
  implementsInterfaces?: string[];
  directives?: Directives;
  fieldsDefinition?: FieldsDefinition;
}

export interface UnionTypeDefinition extends TypeDefinitionBase {
  typeType: "union";
  description?: string;
  name: string;
  directives?: Directives;
  unionMemberTypes?: string[];
}

export interface EnumTypeDefinition extends TypeDefinitionBase {
  typeType: "enum";
  description?: string;
  name: string;
  directives?: Directives;
  enumValuesDefinition?: EnumValuesDefinition;
}

export type EnumValuesDefinition = EnumValueDefinition[];

export interface EnumValueDefinition {
  description?: string;
  enumValue: string;
  directives?: Directives;
}

export interface InputObjectTypeDefinition extends TypeDefinitionBase {
  typeType: "inputObject";
  description?: string;
  name: string;
  directives?: Directives;
  inputFieldsDefinition?: InputFieldsDefinition;
}

export type InputFieldsDefinition = InputValueDefinition[];

export type TypeDefinition =
  | ScalarTypeDefinition
  | ObjectTypeDefinition
  | InterfaceTypeDefinition
  | UnionTypeDefinition
  | EnumTypeDefinition
  | InputObjectTypeDefinition;

export interface DirectiveDefinition {
  description?: string;
  name: string;
  argumentsDefinition?: ArgumentsDefinition;
  repeatable: boolean;
  directiveLocations: DirectiveLocation[];
}

export type DirectiveLocation =
  | ExecutableDirectiveLocation
  | TypeSystemDirectiveLocation;

export type ExecutableDirectiveLocation =
  | "QUERY"
  | "MUTATION"
  | "SUBSCRIPTION"
  | "FIELD"
  | "FRAGMENT_DEFINITION"
  | "FRAGMENT_SPREAD"
  | "INLINE_FRAGMENT"
  | "VARIABLE_DEFINITION";

export type TypeSystemDirectiveLocation =
  | "SCHEMA"
  | "SCALAR"
  | "OBJECT"
  | "FIELD_DEFINITION"
  | "ARGUMENT_DEFINITION"
  | "INTERFACE"
  | "UNION"
  | "ENUM"
  | "ENUM_VALUE"
  | "INPUT_OBJECT"
  | "INPUT_FIELD_DEFINITION";

export type TypeSystemDefinition =
  | SchemaDefinition
  | TypeDefinition
  | DirectiveDefinition;

export interface TypeSystemExtensionBase
  extends TypeSystemDefinitionOrExtensionBase {
  subType: "extension";
}

export interface SchemaExtension extends TypeSystemExtensionBase {
  extensionType: "schema";
  directives?: Directives;
  rootOperationTypeDefinition: RootOperationTypeDefinition[];
}

export interface TypeExtensionBase extends TypeSystemExtensionBase {
  extensionType: "type";
}

export interface ScalarTypeExtension extends TypeExtensionBase {
  typeType: "scalar";
  name: string;
  directives?: Directives;
}

export interface ObjectTypeExtension extends TypeExtensionBase {
  typeType: "object";
  name: string;
  implementsInterfaces?: string[];
  directives?: Directives;
  fieldsDefinition?: FieldsDefinition;
}

export interface InterfaceTypeExtension extends TypeExtensionBase {
  typeType: "interface";
  name: string;
  implementsInterfaces?: string[];
  directives?: Directives;
  fieldsDefinition?: FieldsDefinition;
}

export interface UnionTypeExtension extends TypeExtensionBase {
  typeType: "union";
  name: string;
  directives?: Directives;
  unionMemberTypes?: string[];
}

export interface EnumTypeExtension extends TypeExtensionBase {
  typeType: "enum";
  name: string;
  directives?: Directives;
  enumValuesDefinition?: EnumValuesDefinition;
}

export interface InputObjectTypeExtension extends TypeExtensionBase {
  typeType: "inputObject";
  name: string;
  directives?: Directives;
  inputFieldsDefinition?: InputFieldsDefinition;
}

export type TypeExtension =
  | ScalarTypeExtension
  | ObjectTypeExtension
  | InterfaceTypeExtension
  | UnionTypeExtension
  | EnumTypeExtension
  | InputObjectTypeExtension;

export type TypeSystemExtension = SchemaExtension | TypeExtension;

export type TypeSystemDefinitionOrExtension =
  | TypeSystemDefinition
  | TypeSystemExtension;

export function parse(input: Token[]): Document {
  throw new Error("Not implemented yet");
}
