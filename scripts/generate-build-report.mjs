import fs from 'fs/promises';
import path from 'path';

const metafilePath = path.resolve('dist/build-meta.json');
const reportPath = path.resolve('BUILD_REPORT.md');
const expectedOutputFile = 'dist/server.js'; // Define the expected JS output file
// Manually list external packages based on your build command
const externalPackages = ['ioredis', '@hono/node-server'];

async function generateReport() {
    let meta;
    try {
        const metaJson = await fs.readFile(metafilePath, 'utf8');
        meta = JSON.parse(metaJson);
    } catch (error) {
        console.error(`Error reading metafile: ${metafilePath}`, error);
        process.exit(1);
    }

    let markdown = `# Build Report\n\n`;
    markdown += `Generated: ${new Date().toISOString()}\n\n`;

    // --- External Packages ---
    markdown += `## External Packages\n\n`;
    markdown += `The following packages were marked as external and are **not** included in the bundle:\n`;
    externalPackages.forEach(pkg => markdown += `- \`${pkg}\`\n`);
    markdown += '\n';


    // --- Build Warnings ---
    if (meta.warnings && meta.warnings.length > 0) {
        markdown += `## Build Warnings (${meta.warnings.length})\n\n`;
        meta.warnings.forEach(warning => {
            markdown += `**Warning:** ${warning.text}\n`;
            if (warning.location) {
                markdown += `- **File:** \`${warning.location.file}\` (Line: ${warning.location.line}, Col: ${warning.location.column})\n`;
                markdown += `- **Line:** \`${warning.location.lineText}\`\n`;
            }
            markdown += `\n---\n\n`;
        });
    } else {
        markdown += `## Build Warnings\n\n`;
        markdown += `No warnings reported by esbuild.\n\n`;
    }

    // --- Build Errors ---
    if (meta.errors && meta.errors.length > 0) {
        markdown += `## Build Errors (${meta.errors.length})\n\n`;
        meta.errors.forEach(error => {
            markdown += `**Error:** ${error.text}\n`;
            if (error.location) {
                markdown += `- **File:** \`${error.location.file}\` (Line: ${error.location.line}, Col: ${error.location.column})\n`;
                markdown += `- **Line:** \`${error.location.lineText}\`\n`;
            }
            markdown += `\n---\n\n`;
        });
    } else {
        markdown += `## Build Errors\n\n`;
        markdown += `No errors reported by esbuild.\n\n`;
    }


    // --- Inputs (Source Files) ---
    markdown += `## Source Files Included\n\n`;
    const inputs = Object.keys(meta.inputs);
    markdown += `Total source files analyzed: ${inputs.length}\n\n`;


    // --- Outputs (Bundle Details) ---
    markdown += `## Output Bundle\n\n`;
    // Find the specific output entry for the JS file
    const outputEntry = Object.entries(meta.outputs).find(([outputFile]) => outputFile === expectedOutputFile);


    if (outputEntry) {
        const [outputFile, details] = outputEntry;
        const totalSizeKB = (details.bytes / 1024).toFixed(2);

        markdown += `- **File:** \`${outputFile}\`\n`;
        markdown += `- **Total Size:** ${totalSizeKB} KB\n`;

        // --- Largest Contributors ---
        if (details.inputs) { // Check if inputs exist for this entry
            markdown += `\n### Largest Contributors (by size)\n\n`;
            markdown += `| File Path | Size (KB) |\n`;
            markdown += `|---|---|\n`;

            const sortedInputs = Object.entries(details.inputs)
                .map(([inputPath, inputDetails]) => ({
                    path: inputPath,
                    bytesInOutput: inputDetails.bytesInOutput,
                }))
                .sort((a, b) => b.bytesInOutput - a.bytesInOutput);

            // List top N contributors
            const topN = 15;
            let contributorsFound = 0;
            sortedInputs.slice(0, topN).forEach(input => {
                if (input.bytesInOutput > 0) { // Only show files that contribute size
                     const sizeKB = (input.bytesInOutput / 1024).toFixed(2);
                     markdown += `| \`${input.path}\` | ${sizeKB} |\n`;
                     contributorsFound++;
                }
            });

            if (contributorsFound === 0) {
                 markdown += `| *No significant contributors found.* | - |\n`;
            }
            markdown += '\n'; // Add a newline after the table
        } else {
             markdown += "\n*Input details not available for this output file.*\n\n";
        }

    } else {
        markdown += `Expected output file \`${expectedOutputFile}\` not found in metafile outputs.\n\n`;
    }


    // --- Write Report ---
    try {
        await fs.writeFile(reportPath, markdown);
        console.log(`Build report generated at: ${reportPath}`);
    } catch (error) {
        console.error(`Error writing report file: ${reportPath}`, error);
        process.exit(1);
    }
}

generateReport();