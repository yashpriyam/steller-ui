## Frontend Technologies:
1. **React JS**
2. **TypeScript**
3. **GraphQL**

## Backend Technologies:
1. **Node JS**
2. **TypeScript**
3. **GraphQL**
5. **MongoDB**

## Rules:

- Don't hardcode any string, define it in the locale's translation file for all the languages and then use it in the code
- Add the translation string's key in alphabetically order
- Create all the scss file inside scss's components folder and just import it inside index.scss file in same folder

## Set Path Aliases - https://dev.to/larswaechter/path-aliases-with-typescript-in-nodejs-4353

## Setting Up Global Types in TypeScript

1. **Create a Types File**

   Create a file (e.g., `types.d.ts`) in your project to declare the global types. For example:

   ```typescript
   // types.d.ts
   declare global {
     type MyType = { name: string };
   }

2. **Update tsconfig.json**

Open your tsconfig.json file and update the compilerOptions section to include the path to your types file under the "types" field. For example:
```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["./path/to/your/types.d.ts"],
    // other compiler options...
  }
}