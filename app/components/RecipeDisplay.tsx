'use client';

import { useRef, useState } from 'react';
import jsPDF from 'jspdf';

interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime?: string;
  servings?: string;
  coverImage?: string;
  sourceUrl?: string;
}

interface RecipeDisplayProps {
  recipe: Recipe;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  const recipeRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 15; // Reduced from 20
      const contentWidth = pageWidth - (margin * 2);
      let yPosition = margin;

      // Helper to add new page if needed
      const checkPageBreak = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };

      // Helper to parse and render text with <strong> tags
      const renderTextWithFormatting = (html: string, x: number, startY: number, maxWidth: number, lineHeight: number) => {
        let currentY = startY;
        
        // Split by <strong> tags
        const parts = html.split(/(<strong>.*?<\/strong>)/g).filter(p => p);
        let currentLine = '';
        let currentX = x;
        
        parts.forEach((part) => {
          const isBold = part.startsWith('<strong>');
          const text = isBold ? part.replace(/<\/?strong>/g, '') : part;
          
          // Split by words to handle wrapping
          const words = text.split(' ');
          
          words.forEach((word, idx) => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const font = isBold ? 'bold' : 'normal';
            pdf.setFont('helvetica', font);
            
            const testWidth = pdf.getTextWidth(testLine);
            
            if (testWidth > maxWidth && currentLine) {
              // Print current line
              currentX = x;
              words.slice(0, idx).forEach((w, i) => {
                const prevFont = isBold ? 'bold' : 'normal';
                pdf.setFont('helvetica', prevFont);
                if (i > 0) {
                  currentX += pdf.getTextWidth(' ');
                  pdf.text(' ', currentX, currentY);
                }
                pdf.text(w, currentX, currentY);
                currentX += pdf.getTextWidth(w);
              });
              currentY += lineHeight;
              currentLine = word;
              currentX = x;
            } else {
              currentLine = testLine;
            }
          });
          
          // Render remaining text
          if (currentLine) {
            pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
            pdf.text(currentLine, currentX, currentY);
            currentX += pdf.getTextWidth(currentLine);
            currentLine = '';
          }
        });
        
        return currentY;
      };

      // Helper to strip HTML tags (fallback)
      const stripHtml = (html: string) => {
        return html.replace(/<[^>]*>/g, '');
      };

      // Title - more compressed with hyperlink
      pdf.setFontSize(20); // Reduced from 24
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 255); // Blue color for hyperlink
      const titleLines = pdf.splitTextToSize(recipe.title, contentWidth);
      titleLines.forEach((line: string, index: number) => {
        checkPageBreak(9);
        if (recipe.sourceUrl && index === 0) {
          // Only add link to first line of title
          pdf.textWithLink(line, margin, yPosition, { url: recipe.sourceUrl });
        } else {
          pdf.text(line, margin, yPosition);
        }
        yPosition += 9; // Reduced from 12
      });
      pdf.setTextColor(0, 0, 0); // Reset to black
      yPosition += 1; // Reduced from 2 for tighter spacing

      // Description - more compressed
      if (recipe.description) {
        pdf.setFontSize(10); // Reduced from 11
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(80, 80, 80);
        const descLines = pdf.splitTextToSize(recipe.description, contentWidth);
        descLines.forEach((line: string) => {
          checkPageBreak(5);
          pdf.text(line, margin, yPosition);
          yPosition += 5; // Reduced from 6
        });
        pdf.setTextColor(0, 0, 0);
        yPosition += 2; // Reduced from 5
      }

      // Cook time and servings - remove emojis, more compact
      if (recipe.cookTime || recipe.servings) {
        pdf.setFontSize(9); // Reduced from 10
        pdf.setTextColor(100, 100, 100);
        let info = '';
        if (recipe.cookTime) info += `${recipe.cookTime}`;
        if (recipe.servings) info += info ? `  •  ${recipe.servings}` : `${recipe.servings}`;
        pdf.text(info, margin, yPosition);
        yPosition += 6; // Reduced from 10
        pdf.setTextColor(0, 0, 0);
      }

      // Divider line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 6; // Reduced from 10

      // Ingredients Section Header - more compact, no emoji
      checkPageBreak(10);
      pdf.setFontSize(13); // Reduced from 16
      pdf.setFont('helvetica', 'bold');
      pdf.text('Ingredients', margin, yPosition);
      yPosition += 6; // Reduced from 10

      pdf.setFontSize(9); // Reduced from 10
      pdf.setFont('helvetica', 'normal');
      
      // Layout: Two columns for ingredients + image on the right (37.5% + 37.5% + 25%)
      const ingredientsWidth = contentWidth * 0.75; // 75% for ingredients
      const imageWidth = contentWidth * 0.25; // 25% for image
      const imageX = margin + ingredientsWidth + 5;
      
      // Split ingredients into two columns
      const halfPoint = Math.ceil(recipe.ingredients.length / 2);
      const col1 = recipe.ingredients.slice(0, halfPoint);
      const col2 = recipe.ingredients.slice(halfPoint);
      
      const colWidth = (ingredientsWidth - 5) / 2;
      const startY = yPosition;

      // Column 1
      let col1Y = startY;
      col1.forEach((ingredient) => {
        if (col1Y + 5 > pageHeight - margin) return; // Skip if would overflow
        pdf.setFillColor(255, 140, 0);
        pdf.circle(margin + 1.5, col1Y - 1.2, 0.8, 'F'); // Smaller bullet
        // Strip HTML tags from ingredient text for PDF
        const cleanIngredient = stripHtml(ingredient);
        const lines = pdf.splitTextToSize(cleanIngredient, colWidth - 6);
        lines.forEach((line: string, idx: number) => {
          pdf.text(line, margin + 5, col1Y);
          if (idx < lines.length - 1) col1Y += 4;
        });
        col1Y += 4.5; // Reduced from 6
      });

      // Column 2
      let col2Y = startY;
      const col2X = margin + colWidth + 5;
      col2.forEach((ingredient) => {
        if (col2Y + 5 > pageHeight - margin) return; // Skip if would overflow
        pdf.setFillColor(255, 140, 0);
        pdf.circle(col2X + 1.5, col2Y - 1.2, 0.8, 'F'); // Smaller bullet
        // Strip HTML tags from ingredient text for PDF
        const cleanIngredient = stripHtml(ingredient);
        const lines = pdf.splitTextToSize(cleanIngredient, colWidth - 6);
        lines.forEach((line: string, idx: number) => {
          pdf.text(line, col2X + 5, col2Y);
          if (idx < lines.length - 1) col2Y += 4;
        });
        col2Y += 4.5; // Reduced from 6
      });

      // Add cover image if available - size it to match the ingredient list height
      if (recipe.coverImage) {
        try {
          // Calculate available height from the ingredients section
          const availableHeight = Math.max(col1Y, col2Y) - startY;
          // TikTok images are typically 3:4 ratio (300 width x 400 height)
          const aspectRatio = 3 / 4; // width / height
          // Calculate width based on available height to maintain aspect ratio
          const imgWidth = availableHeight * aspectRatio;
          // Use the calculated dimensions (may be narrower than allocated space)
          const imgHeight = availableHeight;
          // Center the image in the allocated space if it's narrower
          const imgX = imageX + (imageWidth - imgWidth) / 2;
          // Align top of image with top of first ingredient text
          pdf.addImage(recipe.coverImage, 'JPEG', imgX, startY - 2, imgWidth, imgHeight, undefined, 'FAST');
        } catch (err) {
          console.warn('Could not add image to PDF:', err);
        }
      }

      yPosition = Math.max(col1Y, col2Y) + 3; // Reduced from 5
      checkPageBreak(15);

      // Divider line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 6; // Reduced from 10

      // Instructions Section - more compact, no emoji
      checkPageBreak(10);
      pdf.setFontSize(13); // Reduced from 16
      pdf.setFont('helvetica', 'bold');
      pdf.text('Instructions', margin, yPosition);
      yPosition += 6; // Reduced from 10

      pdf.setFontSize(9); // Reduced from 10
      pdf.setFont('helvetica', 'normal');

      recipe.instructions.forEach((instruction, index) => {
        checkPageBreak(12);
        
        // Number
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}.`, margin, yPosition);
        
        // Check if instruction has HTML formatting
        if (instruction.includes('<strong>')) {
          // Parse and render with formatting - improved space handling
          const parts = instruction.split(/(<strong>.*?<\/strong>)/g).filter(p => p);
          const maxWidth = contentWidth - 7;
          let lineSegments: Array<{text: string, bold: boolean}> = [];
          let currentLineWidth = 0;
          
          parts.forEach((part, partIdx) => {
            const isBold = part.startsWith('<strong>');
            const text = isBold ? part.replace(/<\/?strong>/g, '') : part;
            
            // Split into words but preserve info about spaces
            const words = text.split(/(\s+)/); // This keeps spaces as separate elements
            
            words.forEach((word) => {
              if (!word) return; // Skip empty strings
              
              const isSpace = /^\s+$/.test(word);
              
              if (isSpace) {
                // Only add space if we have content already
                if (lineSegments.length > 0) {
                  lineSegments.push({text: ' ', bold: false});
                  pdf.setFont('helvetica', 'normal');
                  currentLineWidth += pdf.getTextWidth(' ');
                }
              } else {
                // It's a word
                pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
                const wordWidth = pdf.getTextWidth(word);
                
                if (currentLineWidth + wordWidth > maxWidth && lineSegments.length > 0) {
                  // Render current line
                  let xPos = margin + 7;
                  lineSegments.forEach(seg => {
                    pdf.setFont('helvetica', seg.bold ? 'bold' : 'normal');
                    pdf.text(seg.text, xPos, yPosition);
                    xPos += pdf.getTextWidth(seg.text);
                  });
                  yPosition += 4.5;
                  lineSegments = [{text: word, bold: isBold}];
                  currentLineWidth = wordWidth;
                } else {
                  lineSegments.push({text: word, bold: isBold});
                  currentLineWidth += wordWidth;
                }
              }
            });
          });
          
          // Render remaining line
          if (lineSegments.length > 0) {
            let xPos = margin + 7;
            lineSegments.forEach(seg => {
              pdf.setFont('helvetica', seg.bold ? 'bold' : 'normal');
              pdf.text(seg.text, xPos, yPosition);
              xPos += pdf.getTextWidth(seg.text);
            });
            yPosition += 4.5;
          }
        } else {
          // No formatting, use simple approach
          const cleanInstruction = stripHtml(instruction);
          pdf.setFont('helvetica', 'normal');
          const lines = pdf.splitTextToSize(cleanInstruction, contentWidth - 7);
          lines.forEach((line: string, idx: number) => {
            if (idx > 0) checkPageBreak(4.5);
            pdf.text(line, margin + 7, yPosition);
            yPosition += 4.5; // Increased from 4 for better readability
          });
        }
        yPosition += 2; // Reduced from 3
      });

      const fileName = recipe.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      pdf.save(`${fileName}_recipe.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 w-full lg:max-w-[8.5in] mx-auto">
      {/* Download PDF Button */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-gray-700 dark:to-gray-700 px-6 py-3 border-b border-gray-200 dark:border-gray-600 flex justify-end">
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-lg hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-[1.02] active:scale-[0.98] text-sm"
        >
          {isGeneratingPDF ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>generating pdf...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>download pdf</span>
            </>
          )}
        </button>
      </div>

      {/* Recipe Content - Responsive with PDF forcing */}
      <div ref={recipeRef} className="p-8 bg-white w-full lg:w-[8.5in] mx-auto">
        {/* Recipe Header */}
        <div className="recipe-header border-b border-gray-300 pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {recipe.title}
          </h2>
          {recipe.description && (
            <p className="text-gray-600 text-sm leading-snug">
              {recipe.description}
            </p>
          )}
          {(recipe.cookTime || recipe.servings) && (
            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              {recipe.cookTime && (
                <div className="flex items-center gap-1">
                  <span>⏱️</span>
                  <span>{recipe.cookTime}</span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center gap-1">
                  <span>👥</span>
                  <span>{recipe.servings}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Three Column Layout: Ingredients (2 cols) + Image */}
        <div className="ingredients-grid flex flex-col lg:flex-row gap-4 mb-4">
          {/* Ingredients Section - Split into 2 columns (37.5% each) */}
          <div className="recipe-section lg:flex-[3]">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-1">
              🥘 Ingredients
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
              {/* First Column */}
              <ul className="space-y-1">
                {recipe.ingredients.slice(0, Math.ceil(recipe.ingredients.length / 2)).map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700 text-sm"
                  >
                    <span className="text-orange-500 flex-shrink-0 leading-snug">•</span>
                    <span
                      className="leading-snug"
                      dangerouslySetInnerHTML={{ __html: ingredient }}
                    />
                  </li>
                ))}
              </ul>

              {/* Second Column */}
              <ul className="space-y-1">
                {recipe.ingredients.slice(Math.ceil(recipe.ingredients.length / 2)).map((ingredient, index) => (
                  <li
                    key={index + Math.ceil(recipe.ingredients.length / 2)}
                    className="flex items-start gap-2 text-gray-700 text-sm"
                  >
                    <span className="text-orange-500 flex-shrink-0 leading-snug">•</span>
                    <span
                      className="leading-snug"
                      dangerouslySetInnerHTML={{ __html: ingredient }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cover Image - 25% width on desktop, full width on mobile */}
          {recipe.coverImage && (
            <div className="rounded-lg overflow-hidden lg:flex-1 max-w-xs mx-auto lg:mx-0">
              <img 
                src={recipe.coverImage} 
                alt={recipe.title}
                className="w-full h-auto object-cover"
                crossOrigin="anonymous"
              />
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Instructions Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-1">
            📝 Instructions
          </h3>
          <ol className="space-y-2 list-none">
            {recipe.instructions.map((instruction, index) => (
              <li
                key={index}
                className="recipe-instruction flex items-start gap-2 text-gray-700 text-sm"
              >
                <span className="flex-shrink-0 font-semibold text-gray-900 min-w-[1.25rem]">
                  {index + 1}.
                </span>
                <span 
                  className="leading-snug flex-1"
                  dangerouslySetInnerHTML={{ __html: instruction }}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

