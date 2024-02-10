import type { DocumentNode } from "graphql";
export const typeDefs = {
  kind: "Document",
  definitions: [
    {
      kind: "ObjectTypeDefinition",
      name: { kind: "Name", value: "Query", loc: { start: 5, end: 10 } },
      interfaces: [],
      directives: [],
      fields: [],
      loc: { start: 0, end: 10 },
    },
    {
      kind: "ObjectTypeExtension",
      name: { kind: "Name", value: "Query", loc: { start: 24, end: 29 } },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "product", loc: { start: 34, end: 41 } },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: { kind: "Name", value: "id", loc: { start: 42, end: 44 } },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "Int", loc: { start: 46, end: 49 } },
                  loc: { start: 46, end: 49 },
                },
                loc: { start: 46, end: 50 },
              },
              directives: [],
              loc: { start: 42, end: 50 },
            },
          ],
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "Product", loc: { start: 53, end: 60 } },
            loc: { start: 53, end: 60 },
          },
          directives: [],
          loc: { start: 34, end: 60 },
        },
      ],
      loc: { start: 12, end: 62 },
    },
    {
      kind: "ObjectTypeDefinition",
      name: { kind: "Name", value: "Product", loc: { start: 69, end: 76 } },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "id", loc: { start: 81, end: 83 } },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Int", loc: { start: 85, end: 88 } },
              loc: { start: 85, end: 88 },
            },
            loc: { start: 85, end: 89 },
          },
          directives: [],
          loc: { start: 81, end: 89 },
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "name", loc: { start: 92, end: 96 } },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String", loc: { start: 98, end: 104 } },
              loc: { start: 98, end: 104 },
            },
            loc: { start: 98, end: 105 },
          },
          directives: [],
          loc: { start: 92, end: 105 },
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "slug", loc: { start: 108, end: 112 } },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String", loc: { start: 114, end: 120 } },
              loc: { start: 114, end: 120 },
            },
            loc: { start: 114, end: 121 },
          },
          directives: [],
          loc: { start: 108, end: 121 },
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "description", loc: { start: 124, end: 135 } },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String", loc: { start: 137, end: 143 } },
              loc: { start: 137, end: 143 },
            },
            loc: { start: 137, end: 144 },
          },
          directives: [],
          loc: { start: 124, end: 144 },
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "price", loc: { start: 147, end: 152 } },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Int", loc: { start: 154, end: 157 } },
              loc: { start: 154, end: 157 },
            },
            loc: { start: 154, end: 158 },
          },
          directives: [],
          loc: { start: 147, end: 158 },
        },
      ],
      loc: { start: 64, end: 160 },
    },
  ],
  loc: { start: 0, end: 161 },
} as unknown as DocumentNode;
