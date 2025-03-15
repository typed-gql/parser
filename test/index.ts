import { lex } from "@typed-gql/lexer";
import { existsSync, readdirSync, readFileSync } from "fs";
import { join } from "path";
import { exit } from "process";
import { parse } from "../src";
import { stringify } from "./stringify";

function sanitize(str: string): string {
  return str.replace(/\r\n/g, "\n");
}

function test(directory: string) {
  const files = readdirSync(directory);
  const gqlFiles = files.filter((file) => /^\d{2}-.*\.gql$/.test(file)).sort();
  let result = 0;
  gqlFiles.forEach((gqlFile) => {
    const gqlFilePath = join(directory, gqlFile);
    const jsonFilePath = join(directory, gqlFile.replace(/\.gql$/, ".json"));
    if (!existsSync(jsonFilePath)) {
      console.error(`Missing JSON file for ${gqlFile}`);
      return;
    }

    const gqlContent = sanitize(readFileSync(gqlFilePath, "utf-8"));
    const expectedJson = sanitize(readFileSync(jsonFilePath, "utf-8"));

    const lexResult = lex(gqlContent);
    if (!Array.isArray(lexResult)) {
      console.log(`Test failed for ${gqlFile}`);
      result = 1;
      return;
    }
    const parseResult = parse(lexResult);

    if (stringify(parseResult) === expectedJson) {
      console.log(`Test passed for ${gqlFile}`);
    } else {
      console.log(`Test failed for ${gqlFile}`);
      result = 1;
      return;
    }
  });
  exit(result);
}

const testDirectory = "./test/data"; // Replace with the actual directory

test(testDirectory);
