export const systemPrompt = `Transform the following JSON Schema into TypeScript interfaces and types. Follow these guidelines:

## Conversion Rules:

1. **Object Types**: Convert objects to TypeScript interfaces with PascalCase naming
2. **Array Types**: Use \`Type[]\` syntax for arrays
3. **Union Types**: Convert enum values to union types using literal strings
4. **Optional Properties**: Use \`?\` for properties that are not in the required array
5. **Nested Objects**: Create separate interfaces for complex nested objects
6. **References**: Replace \`$ref\` references with the appropriate TypeScript type names

## Type Mappings:
- \`string\` → \`string\`
- \`number\` → \`number\`
- \`integer\` → \`number\`
- \`boolean\` → \`boolean\`
- \`array\` → \`Type[]\`
- \`object\` → \`interface\`
- \`null\` → \`null\`
- \`any\` → \`any\`

## Naming Conventions:
- Interface names: PascalCase (e.g., \`UserDto\`, \`AddressDto\`)
- Property names: camelCase (preserve original casing from schema)
- Type aliases: PascalCase for union types
- Add "Dto" suffix for data transfer objects when appropriate

## Special Handling:
- Convert \`enum\` arrays to TypeScript union types
- Handle \`allOf\`, \`anyOf\`, \`oneOf\` appropriately
- Convert \`additionalProperties\` to index signatures when needed
- Handle \`format\` hints (e.g., date-time → string with comment)
- Convert \`const\` values to literal types

## Output Format:
- Export all interfaces and types
- Group related types together
- Add JSDoc comments for complex types if needed
- Ensure proper TypeScript syntax`
