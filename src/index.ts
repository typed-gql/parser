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
  arguments?: Arguments;
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
  fieldsDefinition?: FieldsDefinition;
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

export interface DirectiveDefinition extends TypeSystemDefinitionBase {
  definitionType: "directive";
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

export interface Error {
  message: string;
  tokenNear?: Token;
}

export function parse(input: Token[]): Document | Error {
  try {
    const [document, index] = unwrap(parseDocument(input, 0));
    if (index != input.length) {
      return {
        message: "Unterminated document",
        tokenNear: input[index],
      };
    }
    return document;
  } catch (e) {
    if (e instanceof ParseError) {
      return e.error;
    }
    throw e;
  }
}

class ParseError extends Error {
  public readonly error: Error;

  constructor(error: Error) {
    super();
    this.error = error;
  }
}

const operationTypes = ["query", "mutation", "subscription"] as const;

type ParseResult<T> = ParseSuccessResult<T> | Error;
type ParseSuccessResult<T> = [result: T, nextIndex: number];

function unwrap(error: Error, alternatives?: string): never;
function unwrap<T>(
  result: ParseResult<T>,
  alternatives?: string
): ParseSuccessResult<T>;
function unwrap<T>(
  result: ParseResult<T>,
  alternatives?: string
): ParseSuccessResult<T> {
  if (!Array.isArray(result)) {
    const message = alternatives ? `Expected ${alternatives}` : result.message;
    throw new ParseError({ ...result, message });
  }
  return result;
}

function arrayIncludes<T extends string>(
  array: readonly T[],
  string: string
): string is T {
  return (array as readonly string[]).includes(string);
}

type TokenV2 = Token["type"] extends infer I
  ? I extends any
    ? Token & Record<"type", I>
    : never
  : never;

function expect<T extends Token["type"]>(
  token: Token | undefined,
  tokenType: T,
  alternatives?: string
): Extract<TokenV2, Record<"type", T>> {
  if (token?.type !== tokenType) {
    const message = alternatives
      ? `Expected ${alternatives}, or ${tokenType}`
      : `Expected ${tokenType}`;
    unwrap({ message, tokenNear: token });
  }
  return token as Extract<TokenV2, Record<"type", T>>;
}

function parseDocument(
  tokens: Token[],
  startIndex: number
): ParseResult<Document> {
  let index = startIndex;
  const result: Definition[] = [];
  let tmp: ParseResult<Definition>;
  while (Array.isArray((tmp = parseDefinition(tokens, index)))) {
    const [definition, lastIndex] = tmp;
    result.push(definition);
    index = lastIndex;
  }
  return [result, index];
}

function parseDefinition(
  tokens: Token[],
  startIndex: number
): ParseResult<Definition> {
  let tmp: ParseResult<Definition>;
  if (Array.isArray((tmp = parseExecutableDefinition(tokens, startIndex)))) {
    return tmp;
  } else if (
    Array.isArray(
      (tmp = parseTypeSystemDefinitionOrExtension(tokens, startIndex))
    )
  ) {
    return tmp;
  }
  return { message: "Unrecognized Definition", tokenNear: tokens[startIndex] };
}

function parseExecutableDefinition(
  tokens: Token[],
  startIndex: number
): ParseResult<ExecutableDefinition> {
  let tmp: ParseResult<ExecutableDefinition>;
  if (Array.isArray((tmp = parseOperationDefinition(tokens, startIndex)))) {
    return tmp;
  } else if (
    Array.isArray((tmp = parseFragmentDefinition(tokens, startIndex)))
  ) {
    return tmp;
  }
  return {
    message: "Unrecognized ExecutableDefinition",
    tokenNear: tokens[startIndex],
  };
}

function parseOperationDefinition(
  tokens: Token[],
  startIndex: number
): ParseResult<OperationDefinition> {
  let index = startIndex;
  const tmp = tokens[index++];
  if (tmp.type !== "name" || !arrayIncludes(operationTypes, tmp.value)) {
    return { message: "Expected OperationType" };
  }
  const operationType = tmp.value;
  const { value: name } = expect(tokens[index++], "name");
  let variableDefinitions: VariableDefinitions | undefined;
  [variableDefinitions, index] = parseOptionalVariableDefinitions(
    tokens,
    index
  );
  let directives: Directives | undefined;
  [directives, index] = parseOptionalDirectives(tokens, index);
  let selectionSet: SelectionSet;
  [selectionSet, index] = unwrap(parseSelectionSet(tokens, index));
  return [
    {
      type: "executable",
      subType: "operation",
      operationType,
      name,
      variableDefinitions,
      directives,
      selectionSet,
    },
    index,
  ];
}

function parseOptionalVariableDefinitions(
  tokens: Token[],
  startIndex: number
): ParseSuccessResult<VariableDefinitions | undefined> {
  let index = startIndex;
  if (tokens[index++].type !== "(") {
    return [undefined, startIndex];
  }
  const result: VariableDefinitions = [];
  let variableDefinition: VariableDefinition;
  [variableDefinition, index] = unwrap(
    parseVariableDefinition(tokens, index),
    "VariableDefinition"
  );
  result.push(variableDefinition);
  let tmp: ParseResult<VariableDefinition>;
  while (Array.isArray((tmp = parseVariableDefinition(tokens, index)))) {
    [variableDefinition, index] = tmp;
    result.push(variableDefinition);
  }
  expect(tokens[index++], ")", "VariableDefinition");
  return [result, index];
}

function parseVariableDefinition(
  tokens: Token[],
  startIndex: number
): ParseResult<VariableDefinition> {
  let index = startIndex;
  if (tokens[index++]?.type !== "$") {
    return { message: "Expected $", tokenNear: tokens[startIndex] };
  }
  const { value: variable } = expect(tokens[index++], "name");
  expect(tokens[index++], ":");
  let type: Type;
  [type, index] = unwrap(parseType(tokens, index));
  if (tokens[index]?.type !== "=") {
    return [{ type, variable }, index];
  }
  index++;
  let defaultValue: Value;
  [defaultValue, index] = unwrap(parseValue(tokens, index));
  let directives: Directives | undefined;
  [directives, index] = parseOptionalDirectives(tokens, index);
  return [{ type, variable, defaultValue, directives }, index];
}

function parseType(tokens: Token[], startIndex: number): ParseResult<Type> {
  let index = startIndex;
  if (tokens[index]?.type === "[") {
    let innerType: Type;
    [innerType, index] = unwrap(parseType(tokens, index + 1));
    expect(tokens[index++], "]");
    let isNonNull = tokens[index]?.type === "!";
    if (isNonNull) {
      index++;
    }
    return [
      isNonNull
        ? { type: "nonNull", element: { type: "list", element: innerType } }
        : { type: "list", element: innerType },
      index,
    ];
  } else if (tokens[index]?.type === "name") {
    const name = tokens[index];
    if (name?.type !== "name") {
      return { message: "Expected name", tokenNear: tokens[index] };
    }
    let isNonNull = tokens[index]?.type === "!";
    if (isNonNull) {
      index++;
    }
    return [
      isNonNull
        ? { type: "nonNull", element: { type: "named", name: name.value } }
        : { type: "named", name: name.value },
      index,
    ];
  } else {
    return { message: "Unrecognized Type", tokenNear: tokens[startIndex] };
  }
}

function parseValue(tokens: Token[], startIndex: number): ParseResult<Value> {
  let tmp: ParseResult<Value>;
  if (
    Array.isArray((tmp = parseVariable(tokens, startIndex))) ||
    Array.isArray((tmp = parseIntValue(tokens, startIndex))) ||
    Array.isArray((tmp = parseFloatValue(tokens, startIndex))) ||
    Array.isArray((tmp = parseStringValue(tokens, startIndex))) ||
    Array.isArray((tmp = parseBooleanValue(tokens, startIndex))) ||
    Array.isArray((tmp = parseNullValue(tokens, startIndex))) ||
    Array.isArray((tmp = parseEnumValue(tokens, startIndex))) ||
    Array.isArray((tmp = parseListValue(tokens, startIndex))) ||
    Array.isArray((tmp = parseObjectValue(tokens, startIndex)))
  ) {
    return tmp;
  }
  return {
    message: "Unrecognized Value",
    tokenNear: tokens[startIndex],
  };
}

function parseObjectValue(
  tokens: Token[],
  startIndex: number
): ParseResult<ObjectValue> {
  let index = startIndex;
  if (tokens[index++]?.type !== "{") {
    return { message: "Expected {", tokenNear: tokens[startIndex] };
  }
  const result: Partial<Record<string, Value>> = {};
  let current = tokens[index];
  while (current?.type === "name") {
    index++;
    const key = current.value;
    expect(tokens[index++], ":");
    let value: Value;
    [value, index] = unwrap(parseValue(tokens, index));
    result[key] = value;
  }
  expect(tokens[index++], "}");
  return [{ type: "object", value: result }, index];
}

function parseListValue(
  tokens: Token[],
  startIndex: number
): ParseResult<ListValue> {
  let index = startIndex;
  if (tokens[index++]?.type !== "[") {
    return { message: "Expected [", tokenNear: tokens[startIndex] };
  }
  const result: Value[] = [];
  while (tokens[index]?.type !== "]") {
    let value;
    [value, index] = unwrap(parseValue(tokens, index));
    result.push(value);
  }
  expect(tokens[index++], "]");
  return [{ type: "list", values: result }, index];
}

function parseEnumValue(
  tokens: Token[],
  startIndex: number
): ParseResult<EnumValue> {
  let index = startIndex;
  const current = tokens[index++];
  if (current?.type !== "name") {
    return { message: "Expected EnumValue", tokenNear: current };
  }
  if (arrayIncludes(["true", "false", "null"], current.value)) {
    return {
      message: "EnumValue can't be one of true, false, or null",
      tokenNear: current,
    };
  }
  return [{ type: "enum", value: current.value }, index];
}

function parseNullValue(
  tokens: Token[],
  startIndex: number
): ParseResult<NullValue> {
  let index = startIndex;
  const current = tokens[index++];
  if (current?.type !== "name" || current.value !== "null") {
    return { message: "Expected null", tokenNear: current };
  }
  return [{ type: "null" }, index];
}

function parseBooleanValue(
  tokens: Token[],
  startIndex: number
): ParseResult<BooleanValue> {
  let index = startIndex;
  const current = tokens[index++];
  if (
    current?.type !== "name" ||
    (current.value !== "true" && current.value !== "false")
  ) {
    return { message: "Expected one of true, false", tokenNear: current };
  }
  return [{ type: "boolean", value: current.value === "true" }, index];
}

function parseStringValue(
  tokens: Token[],
  startIndex: number
): ParseResult<StringValue> {
  let index = startIndex;
  const current = tokens[index++];
  if (current?.type !== "string") {
    return { message: "Expected one of true, false", tokenNear: current };
  }
  return [{ type: "string", value: current.value }, index];
}

function parseFloatValue(
  tokens: Token[],
  startIndex: number
): ParseResult<FloatValue> {
  let index = startIndex;
  const current = tokens[index++];
  if (current?.type !== "float") {
    return { message: "Expected float", tokenNear: current };
  }
  return [{ type: "float", value: current.value }, index];
}

function parseIntValue(
  tokens: Token[],
  startIndex: number
): ParseResult<IntValue> {
  let index = startIndex;
  const current = tokens[index++];
  if (current?.type !== "int") {
    return { message: "Expected int", tokenNear: current };
  }
  return [{ type: "int", value: current.value }, index];
}

function parseVariable(
  tokens: Token[],
  startIndex: number
): ParseResult<Variable> {
  let index = startIndex;
  if (tokens[index++]?.type !== "$") {
    return { message: "Expected $", tokenNear: tokens[startIndex] };
  }
  const { value: name } = expect(tokens[index++], "name");
  return [{ type: "variable", name }, index];
}

function parseOptionalDirectives(
  tokens: Token[],
  startIndex: number
): ParseSuccessResult<Directives | undefined> {
  let index = startIndex;
  if (tokens[index]?.type !== "@") {
    return [undefined, startIndex];
  }
  const result: Directive[] = [];
  while (tokens[index]?.type === "@") {
    index++;
    const { value: name } = expect(tokens[index++], "name");
    let arguments_: Arguments | undefined;
    [arguments_, index] = parseOptionalArguments(tokens, index);
    result.push({ name, arguments: arguments_ });
  }
  return [result, index];
}

function parseOptionalArguments(
  tokens: Token[],
  startIndex: number
): ParseSuccessResult<Arguments | undefined> {
  let index = startIndex;
  if (tokens[index++]?.type !== "(") {
    return [undefined, startIndex];
  }
  let argument: Argument;
  [argument, index] = unwrap(parseArgument(tokens, index));
  const result = [argument];
  while (tokens[index]?.type !== ")") {
    [argument, index] = unwrap(parseArgument(tokens, index));
    result.push(argument);
  }
  expect(tokens[index++], ")");
  return [result, index];
}

function parseArgument(
  tokens: Token[],
  startIndex: number
): ParseResult<Argument> {
  let index = startIndex;
  const current = tokens[index++];
  if (current?.type !== "name") {
    return { message: "Expected name", tokenNear: current };
  }
  const name = current.value;
  expect(tokens[index++], ":");
  let value: Value;
  [value, index] = unwrap(parseValue(tokens, index));
  return [{ name, value }, index];
}

function parseSelectionSet(
  tokens: Token[],
  startIndex: number
): ParseResult<SelectionSet> {
  let index = startIndex;
  if (tokens[index++]?.type !== "{") {
    return { message: "Expected {", tokenNear: tokens[startIndex] };
  }
  let selection: Selection;
  [selection, index] = unwrap(parseSelection(tokens, index));
  const result = [selection];
  while (tokens[index]?.type !== "}") {
    [selection, index] = unwrap(parseSelection(tokens, index));
    result.push(selection);
  }
  expect(tokens[index++], "}");
  return [result, index];
}

function parseSelection(
  tokens: Token[],
  startIndex: number
): ParseResult<Selection> {
  let tmp: ParseResult<Selection>;
  if (
    Array.isArray((tmp = parseField(tokens, startIndex))) ||
    Array.isArray((tmp = parseFragmentSpread(tokens, startIndex))) ||
    Array.isArray((tmp = parseInlineFragment(tokens, startIndex)))
  ) {
    return tmp;
  }
  return {
    message: "Unrecognized Selection",
    tokenNear: tokens[startIndex],
  };
}

function parseInlineFragment(
  tokens: Token[],
  startIndex: number
): ParseResult<InlineFragment> {
  let index = startIndex;
  if (tokens[index++]?.type !== "...") {
    return { message: "Expeected ...", tokenNear: tokens[startIndex] };
  }
  let typeCondition: string | undefined = undefined;
  {
    const maybeOn = tokens[index];
    if (maybeOn.type === "name") {
      if (maybeOn.value === "on") {
        index++;
        typeCondition = maybeOn.value;
      } else {
        return { message: "Expected on or @ or {", tokenNear: maybeOn };
      }
    }
  }
  let directives: Directives | undefined;
  [directives, index] = parseOptionalDirectives(tokens, index);
  let selectionSet: SelectionSet;
  [selectionSet, index] = unwrap(parseSelectionSet(tokens, index));
  return [
    { type: "inlineFragment", typeCondition, directives, selectionSet },
    index,
  ];
}

function parseFragmentSpread(
  tokens: Token[],
  startIndex: number
): ParseResult<FragmentSpread> {
  let index = startIndex;
  if (tokens[index++]?.type !== "...") {
    return { message: "Expeected ...", tokenNear: tokens[startIndex] };
  }
  const name = tokens[index++];
  if (name?.type !== "name") {
    return { message: "Expected name", tokenNear: name };
  }
  if (name.value === "on") {
    return { message: "Expected name other than on", tokenNear: name };
  }
  let directives: Directives | undefined;
  [directives, index] = parseOptionalDirectives(tokens, index);
  return [{ type: "fragmentSpread", name: name.value, directives }, index];
}

function parseField(tokens: Token[], startIndex: number): ParseResult<Field> {
  let index = startIndex;
  const nameOrAlias = tokens[index++];
  if (nameOrAlias?.type !== "name") {
    return { message: "Expected name", tokenNear: nameOrAlias };
  }
  let name: string | undefined;
  if (tokens[index]?.type === ":") {
    index++;
    ({ value: name } = expect(tokens[index++], "name"));
  }
  let arguments_: Arguments | undefined;
  [arguments_, index] = parseOptionalArguments(tokens, index);
  let directives: Directives | undefined;
  [directives, index] = parseOptionalDirectives(tokens, index);
  let selectionSet: SelectionSet | undefined = undefined;
  const selectionSetResult = parseSelectionSet(tokens, index);
  if (Array.isArray(selectionSetResult)) {
    [selectionSet, index] = selectionSetResult;
  }
  const [realName, realAlias] =
    name === undefined ? [nameOrAlias.value] : [name, nameOrAlias.value];
  return [
    {
      type: "field",
      name: realName,
      alias: realAlias,
      arguments: arguments_,
      directives,
      selectionSet,
    },
    index,
  ];
}

function parseFragmentDefinition(
  tokens: Token[],
  startIndex: number
): ParseResult<FragmentDefinition> {
  let index = startIndex;
  const fragment = tokens[index++];
  if (fragment.type !== "name" || fragment.value !== "fragment") {
    return { message: "Expected fragment", tokenNear: fragment };
  }
  const { value: name } = expect(tokens[index++], "name");
  const on = expect(tokens[index++], "name");
  if (on.value !== "on") {
    unwrap({ message: "Expected on", tokenNear: on });
  }
  const { value: typeCondition } = expect(tokens[index++], "name");
  let directives: Directives | undefined;
  [directives, index] = parseOptionalDirectives(tokens, index);
  let selectionSet: SelectionSet;
  [selectionSet, index] = unwrap(parseSelectionSet(tokens, index));
  return [
    {
      type: "executable",
      subType: "fragment",
      name,
      typeCondition,
      directives,
      selectionSet,
    },
    index,
  ];
}
