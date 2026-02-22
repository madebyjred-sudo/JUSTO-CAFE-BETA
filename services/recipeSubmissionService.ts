
/**
 * Recipe Submission Service
 * 
 * This service handles the submission of user recipes.
 * Currently supports multiple submission methods:
 * 1. EmailJS - Sends recipe via email (recommended for immediate notification)
 * 2. Firebase Firestore - Stores recipe in database (for admin dashboard)
 * 3. LocalStorage - Temporary storage for demo purposes
 * 
 * To use EmailJS:
 * 1. Create account at emailjs.com
 * 2. Create an email template
 * 3. Get your Service ID, Template ID, and Public Key
 * 4. Install: npm install @emailjs/browser
 * 5. Update the configuration below
 */

// Configuration for EmailJS
const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id',     // Replace with your EmailJS Service ID
  TEMPLATE_ID: 'your_template_id',   // Replace with your EmailJS Template ID
  PUBLIC_KEY: 'your_public_key',     // Replace with your EmailJS Public Key
};

export interface RecipeSubmissionData {
  recipeName: string;
  category: string;
  difficulty: string;
  time: string;
  yield: string;
  description: string;
  ingredients: string[];
  steps: string[];
  authorName: string;
  instagram?: string;
  email?: string;
  story?: string;
  submittedAt?: string;
}

/**
 * Submit recipe via EmailJS
 * This sends an email to the admin with all recipe details
 */
export const submitRecipeViaEmail = async (data: RecipeSubmissionData): Promise<boolean> => {
  try {
    // Dynamically import EmailJS to avoid errors if not installed
    const emailjs = await import('@emailjs/browser');
    
    const templateParams = {
      recipe_name: data.recipeName,
      category: data.category,
      difficulty: data.difficulty,
      time: data.time,
      yield: data.yield,
      description: data.description,
      ingredients: data.ingredients.filter(i => i.trim()).join('\n• '),
      steps: data.steps.filter(s => s.trim()).map((s, i) => `${i + 1}. ${s}`).join('\n\n'),
      author_name: data.authorName,
      instagram: data.instagram || 'No proporcionado',
      email: data.email || 'No proporcionado',
      story: data.story || 'No proporcionado',
      submitted_at: new Date().toLocaleString('es-CO'),
    };

    await emailjs.default.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    return true;
  } catch (error) {
    console.error('Error sending recipe via EmailJS:', error);
    return false;
  }
};

/**
 * Submit recipe to Firebase Firestore
 * Stores the recipe in a database for admin review
 */
export const submitRecipeToFirebase = async (data: RecipeSubmissionData): Promise<boolean> => {
  try {
    // This would require Firebase to be initialized in your app
    // Example implementation:
    
    // const { getFirestore, collection, addDoc } = await import('firebase/firestore');
    // const db = getFirestore();
    // 
    // await addDoc(collection(db, 'recipe_submissions'), {
    //   ...data,
    //   status: 'pending', // pending, approved, rejected
    //   submittedAt: new Date().toISOString(),
    // });

    console.log('Firebase submission would happen here');
    return true;
  } catch (error) {
    console.error('Error submitting to Firebase:', error);
    return false;
  }
};

/**
 * Save recipe to LocalStorage
 * Temporary solution for demo/testing
 */
export const saveRecipeToLocalStorage = (data: RecipeSubmissionData): void => {
  const existing = JSON.parse(localStorage.getItem('justo_recipe_submissions') || '[]');
  const newSubmission = {
    ...data,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };
  
  localStorage.setItem(
    'justo_recipe_submissions', 
    JSON.stringify([...existing, newSubmission])
  );
};

/**
 * Get all submissions from LocalStorage
 * Useful for admin dashboard
 */
export const getLocalSubmissions = (): RecipeSubmissionData[] => {
  return JSON.parse(localStorage.getItem('justo_recipe_submissions') || '[]');
};

/**
 * Main submit function
 * Tries multiple methods and falls back if needed
 */
export const submitRecipe = async (data: RecipeSubmissionData): Promise<{
  success: boolean;
  method: string;
  message: string;
}> => {
  // Method 1: Try EmailJS
  const emailSent = await submitRecipeViaEmail(data);
  if (emailSent) {
    return {
      success: true,
      method: 'email',
      message: 'Receta enviada correctamente. Te contactaremos si es seleccionada.',
    };
  }

  // Method 2: Save to LocalStorage as fallback
  saveRecipeToLocalStorage(data);
  
  return {
    success: true,
    method: 'localStorage',
    message: 'Receta guardada. (Modo demo - configura EmailJS para envío real)',
  };
};

/**
 * Setup instructions for the user
 */
export const getSetupInstructions = (): string => `
=== CONFIGURACIÓN DE ENVÍO DE RECETAS ===

OPCIÓN 1: EmailJS (Recomendado)
-------------------------------
1. Crea una cuenta gratuita en https://www.emailjs.com/
2. Crea un servicio de email (Gmail, Outlook, etc.)
3. Crea una plantilla de email con estas variables:
   - {{recipe_name}}
   - {{category}}
   - {{difficulty}}
   - {{time}}
   - {{yield}}
   - {{description}}
   - {{ingredients}}
   - {{steps}}
   - {{author_name}}
   - {{instagram}}
   - {{email}}
   - {{story}}
   - {{submitted_at}}
4. Instala el paquete:
   npm install @emailjs/browser
5. Actualiza EMAILJS_CONFIG en recipeSubmissionService.ts

OPCIÓN 2: Firebase Firestore
-------------------------------
1. Configura Firebase en tu proyecto
2. Habilita Firestore Database
3. Crea la colección 'recipe_submissions'
4. Implementa submitRecipeToFirebase()

OPCIÓN 3: Backend personalizado
-------------------------------
1. Crea un endpoint POST /api/recipes en tu servidor
2. Modifica submitRecipe para hacer fetch a tu API

Para soporte: contacta al equipo de desarrollo
`;
