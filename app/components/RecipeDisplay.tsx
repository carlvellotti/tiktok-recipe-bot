'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime?: string;
  servings?: string;
  coverImage?: string;
}

interface RecipeDisplayProps {
  recipe: Recipe;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  const recipeRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    if (!recipeRef.current) return;
    
    setIsGeneratingPDF(true);
    
    try {
      const element = recipeRef.current;
      
      // Force 8.5x11 dimensions for PDF generation
      const originalWidth = element.style.width;
      const originalMinHeight = element.style.minHeight;
      const originalAspectRatio = element.style.aspectRatio;
      
      element.style.width = '8.5in';
      element.style.minHeight = '11in';
      element.style.aspectRatio = '8.5/11';
      
      // Force desktop layout (row layout with proper flex ratios)
      const ingredientsGrid = element.querySelector('.ingredients-grid') as HTMLElement;
      const ingredientsSection = element.querySelector('.recipe-section') as HTMLElement;
      const imageContainer = element.querySelector('.ingredients-grid > div:last-child') as HTMLElement;
      
      const originalFlexDirection = ingredientsGrid?.style.flexDirection;
      const originalIngredientsFlex = ingredientsSection?.style.flex;
      const originalImageFlex = imageContainer?.style.flex;
      
      if (ingredientsGrid) {
        ingredientsGrid.style.flexDirection = 'row';
      }
      if (ingredientsSection) {
        ingredientsSection.style.flex = '3'; // 75%
      }
      if (imageContainer) {
        imageContainer.style.flex = '1'; // 25%
      }
      
      // Wait for layout to settle
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      
      // Restore original dimensions and layout
      element.style.width = originalWidth;
      element.style.minHeight = originalMinHeight;
      element.style.aspectRatio = originalAspectRatio;
      
      if (ingredientsGrid && originalFlexDirection !== undefined) {
        ingredientsGrid.style.flexDirection = originalFlexDirection;
      }
      if (ingredientsSection && originalIngredientsFlex !== undefined) {
        ingredientsSection.style.flex = originalIngredientsFlex;
      }
      if (imageContainer && originalImageFlex !== undefined) {
        imageContainer.style.flex = originalImageFlex;
      }
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
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
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-gray-700 dark:to-gray-700 px-6 py-3 border-b border-gray-200 dark:border-gray-600">
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
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download PDF</span>
            </>
          )}
        </button>
      </div>

      {/* Recipe Content - Responsive with PDF forcing */}
      <div ref={recipeRef} className="p-8 bg-white w-full lg:w-[8.5in] lg:min-h-[11in] mx-auto">
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

        {/* Two Column Layout: Ingredients + Image */}
        <div className="ingredients-grid flex flex-col lg:flex-row gap-4 mb-4">
          {/* Ingredients Section - 75% width on desktop */}
          <div className="recipe-section lg:flex-[3]">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-1">
              🥘 Ingredients
            </h3>
            <ul className="space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700 text-sm"
                >
                  <span className="text-orange-500 flex-shrink-0 leading-snug">•</span>
                  <span className="leading-snug">{ingredient}</span>
                </li>
              ))}
            </ul>
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

