import React, { useState } from 'react';
import { X, Check, Coffee, ChefHat, Clock, Users, ArrowRight, Sparkles, Heart, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { submitRecipe, RecipeSubmissionData } from '../services/recipeSubmissionService';

interface RecipeSubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStep = 'intro' | 'basics' | 'details' | 'steps' | 'contact' | 'success';

export const RecipeSubmissionForm: React.FC<RecipeSubmissionFormProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<FormStep>('intro');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    recipeName: '',
    category: '',
    difficulty: '',
    time: '',
    yield: '',
    description: '',
    ingredients: [''],
    steps: [''],
    authorName: '',
    instagram: '',
    email: '',
    story: '',
  });

  const categories = ['Filtrados', 'Espresso', 'Inmersión', 'Verano', 'Coctelería'];
  const difficulties = ['Fácil', 'Medio', 'Barista'];

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, ingredients: newIngredients }));
    }
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };

  const addStep = () => {
    setFormData(prev => ({ ...prev, steps: [...prev.steps, ''] }));
  };

  const removeStep = (index: number) => {
    if (formData.steps.length > 1) {
      const newSteps = formData.steps.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, steps: newSteps }));
    }
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    const submissionData: RecipeSubmissionData = {
      recipeName: formData.recipeName,
      category: formData.category,
      difficulty: formData.difficulty,
      time: formData.time,
      yield: formData.yield,
      description: formData.description,
      ingredients: formData.ingredients.filter(i => i.trim() !== ''),
      steps: formData.steps.filter(s => s.trim() !== ''),
      authorName: formData.authorName,
      instagram: formData.instagram,
      email: formData.email,
      story: formData.story,
    };
    
    try {
      const result = await submitRecipe(submissionData);
      
      if (result.success) {
        setCurrentStep('success');
      } else {
        setSubmitError('Hubo un error al enviar tu receta. Intenta de nuevo.');
      }
    } catch (error) {
      setSubmitError('Hubo un error inesperado. Intenta de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'basics':
        return formData.recipeName && formData.category && formData.difficulty;
      case 'details':
        return formData.time && formData.yield && formData.description && 
               formData.ingredients.some(i => i.trim() !== '');
      case 'steps':
        return formData.steps.some(s => s.trim() !== '');
      case 'contact':
        return formData.authorName && (formData.instagram || formData.email);
      default:
        return true;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-justo-dark/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#F5F1E8] rounded-[2rem] shadow-2xl overflow-hidden animate-fade-in-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-justo-dark"
        >
          <X size={24} />
        </button>

        {/* Progress Bar */}
        {currentStep !== 'intro' && currentStep !== 'success' && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-justo-dark/10">
            <div 
              className="h-full bg-justo-brown transition-all duration-500"
              style={{ 
                width: currentStep === 'basics' ? '25%' : 
                       currentStep === 'details' ? '50%' : 
                       currentStep === 'steps' ? '75%' : '100%' 
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto max-h-[90vh] p-8 md:p-12">
          
          {/* INTRO STEP */}
          {currentStep === 'intro' && (
            <div className="text-center space-y-8">
              <div className="w-20 h-20 bg-justo-brown/10 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-justo-brown" />
              </div>
              
              <div className="space-y-4">
                <h2 className="font-heading text-5xl md:text-6xl text-justo-dark">
                  Comparte tu Ritual
                </h2>
                <p className="font-sans text-justo-dark/70 text-lg max-w-md mx-auto leading-relaxed">
                  Cada semana seleccionamos las recetas más creativas de nuestra comunidad. 
                  Si la tuya es elegida, la publicaremos con tu nombre.
                </p>
              </div>

              <div className="bg-white/50 rounded-2xl p-6 space-y-4 max-w-md mx-auto">
                <div className="flex items-center gap-3 text-justo-dark/80">
                  <div className="w-8 h-8 bg-justo-brown/20 rounded-full flex items-center justify-center">
                    <Coffee className="w-4 h-4 text-justo-brown" />
                  </div>
                  <span className="font-sans text-sm">Comparte tu método único</span>
                </div>
                <div className="flex items-center gap-3 text-justo-dark/80">
                  <div className="w-8 h-8 bg-justo-brown/20 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-justo-brown" />
                  </div>
                  <span className="font-sans text-sm">Inspira a otros coffee lovers</span>
                </div>
                <div className="flex items-center gap-3 text-justo-dark/80">
                  <div className="w-8 h-8 bg-justo-brown/20 rounded-full flex items-center justify-center">
                    <ChefHat className="w-4 h-4 text-justo-brown" />
                  </div>
                  <span className="font-sans text-sm">Sé parte de la familia Justo</span>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => setCurrentStep('basics')}
                  className="flex items-center gap-2 mx-auto"
                >
                  Comenzar
                  <ArrowRight size={20} />
                </Button>
                <p className="text-xs text-justo-dark/40 mt-4 font-sans">
                  Tiempo estimado: 3 minutos
                </p>
              </div>
            </div>
          )}

          {/* BASICS STEP */}
          {currentStep === 'basics' && (
            <div className="space-y-8">
              <div className="text-center">
                <span className="text-xs font-body font-bold uppercase tracking-widest text-justo-brown">
                  Paso 1 de 4
                </span>
                <h3 className="font-heading text-4xl text-justo-dark mt-2">
                  Lo Básico
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-body font-bold uppercase tracking-wider text-justo-dark/60 mb-2">
                    Nombre de tu receta *
                  </label>
                  <input
                    type="text"
                    value={formData.recipeName}
                    onChange={(e) => updateField('recipeName', e.target.value)}
                    placeholder="Ej: El V60 de los Domingos"
                    className="w-full px-4 py-3 bg-white border border-justo-dark/10 rounded-xl font-sans text-justo-dark placeholder:text-justo-dark/30 focus:outline-none focus:ring-2 focus:ring-justo-brown/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-body font-bold uppercase tracking-wider text-justo-dark/60 mb-2">
                      Categoría *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => updateField('category', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-justo-dark/10 rounded-xl font-sans text-justo-dark focus:outline-none focus:ring-2 focus:ring-justo-brown/50 appearance-none cursor-pointer"
                    >
                      <option value="">Seleccionar</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-body font-bold uppercase tracking-wider text-justo-dark/60 mb-2">
                      Dificultad *
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => updateField('difficulty', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-justo-dark/10 rounded-xl font-sans text-justo-dark focus:outline-none focus:ring-2 focus:ring-justo-brown/50 appearance-none cursor-pointer"
                    >
                      <option value="">Seleccionar</option>
                      {difficulties.map(diff => (
                        <option key={diff} value={diff}>{diff}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setCurrentStep('intro')} className="flex-1">
                  Atrás
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => setCurrentStep('details')} 
                  className="flex-1"
                  disabled={!canProceed()}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* DETAILS STEP */}
          {currentStep === 'details' && (
            <div className="space-y-8">
              <div className="text-center">
                <span className="text-xs font-body font-bold uppercase tracking-widest text-justo-brown">
                  Paso 2 de 4
                </span>
                <h3 className="font-heading text-4xl text-justo-dark mt-2">
                  Detalles
                </h3>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-body font-bold uppercase tracking-wider text-justo-dark/60 mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Tiempo total *
                    </label>
                    <input
                      type="text"
                      value={formData.time}
                      onChange={(e) => updateField('time', e.target.value)}
                      placeholder="Ej: 4 min"
                      className="w-full px-4 py-3 bg-white border border-justo-dark/10 rounded-xl font-sans text-justo-dark placeholder:text-justo-dark/30 focus:outline-none focus:ring-2 focus:ring-justo-brown/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-bold uppercase tracking-wider text-justo-dark/60 mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Rendimiento *
                    </label>
                    <input
                      type="text"
                      value={formData.yield}
                      onChange={(e) => updateField('yield', e.target.value)}
                      placeholder="Ej: 2 Tazas"
                      className="w-full px-4 py-3 bg-white border border-justo-dark/10 rounded-xl font-sans text-justo-dark placeholder:text-justo-dark/30 focus:outline-none focus:ring-2 focus:ring-justo-brown/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-body font-bold uppercase tracking-wider text-justo-dark/60 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Cuéntanos qué hace especial a esta receta..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-justo-dark/10 rounded-xl font-sans text-justo-dark placeholder:text-justo-dark/30 focus:outline-none focus:ring-2 focus:ring-justo-brown/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-body font-bold uppercase tracking-wider text-justo-dark/60 mb-3">
                    Ingredientes *
                  </label>
                  <div className="space-y-2">
                    {formData.ingredients.map((ing, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="w-8 h-10 flex items-center justify-center text-justo-dark/30 font-body font-bold">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={ing}
                          onChange={(e) => updateIngredient(idx, e.target.value)}
                          placeholder={`Ingrediente ${idx + 1}`}
                          className="flex-1 px-4 py-2 bg-white border border-justo-dark/10 rounded-lg font-sans text-justo-dark placeholder:text-justo-dark/30 focus:outline-none focus:ring-2 focus:ring-justo-brown/50"
                        />
                        {formData.ingredients.length > 1 && (
                          <button
                            onClick={() => removeIngredient(idx)}
                            className="p-2 text-justo-dark/40 hover:text-red-500 transition-colors"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addIngredient}
                    className="mt-2 text-sm font-body font-bold text-justo-brown hover:text-justo-dark transition-colors"
                  >
                    + Agregar ingrediente
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setCurrentStep('basics')} className="flex-1">
                  Atrás
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => setCurrentStep('steps')} 
                  className="flex-1"
                  disabled={!canProceed()}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* STEPS STEP */}
          {currentStep === 'steps' && (
            <div className="space-y-8">
              <div className="text-center">
                <span className="text-xs font-body font-bold uppercase tracking-widest text-justo-brown">
                  Paso 3 de 4
                </span>
                <h3 className="font-heading text-4xl text-justo-dark mt-2">
                  Preparación
                </h3>
              </div>

              <div className="space-y-4">
                {formData.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-8 h-8 bg-justo-brown text-white rounded-full flex items-center justify-center font-body font-bold text-sm shrink-0 mt-2">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={step}
                        onChange={(e) => updateStep(idx, e.target.value)}
                        placeholder={`Paso ${idx + 1}: Describe qué hacer...`}
                        rows={2}
                        className="w-full px-4 py-3 bg-white border border-justo-dark/10 rounded-xl font-sans text-justo-dark placeholder:text-justo-dark/30 focus:outline-none focus:ring-2 focus:ring-justo-brown/50 resize-none"
                      />
                    </div>
                    {formData.steps.length > 1 && (
                      <button
                        onClick={() => removeStep(idx)}
                        className="p-2 text-justo-dark/40 hover:text-red-500 transition-colors self-start"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addStep}
                  className="w-full py-3 border border-dashed border-justo-dark/20 rounded-xl text-sm font-body font-bold text-justo-dark/60 hover:text-justo-brown hover:border-justo-brown transition-colors"
                >
                  + Agregar paso
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setCurrentStep('details')} className="flex-1">
                  Atrás
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => setCurrentStep('contact')} 
                  className="flex-1"
                  disabled={!canProceed()}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* CONTACT STEP */}
          {currentStep === 'contact' && (
            <div className="space-y-8">
              <div className="text-center">
                <span className="text-xs font-body font-bold uppercase tracking-widest text-justo-brown">
                  Paso 4 de 4
                </span>
                <h3 className="font-heading text-4xl text-justo-dark mt-2">
                  ¿Quién eres?
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-body font-bold uppercase tracking-wider text-justo-dark/60 mb-2">
                    Tu nombre *
                  </label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => updateField('authorName', e.target.value)}
                    placeholder="Ej: María Coffee Lover"
                    className="w-full px-4 py-3 bg-white border border-justo-dark/10 rounded-xl font-sans text-justo-dark placeholder:text-justo-dark/30 focus:outline-none focus:ring-2 focus:ring-justo-brown/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-body font-bold uppercase tracking-wider text-justo-dark/60 mb-2">
                      Instagram (opcional)
                    </label>
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => updateField('instagram', e.target.value)}
                      placeholder="@usuario"
                      className="w-full px-4 py-3 bg-white border border-justo-dark/10 rounded-xl font-sans text-justo-dark placeholder:text-justo-dark/30 focus:outline-none focus:ring-2 focus:ring-justo-brown/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-bold uppercase tracking-wider text-justo-dark/60 mb-2">
                      Email (opcional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 bg-white border border-justo-dark/10 rounded-xl font-sans text-justo-dark placeholder:text-justo-dark/30 focus:outline-none focus:ring-2 focus:ring-justo-brown/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-body font-bold uppercase tracking-wider text-justo-dark/60 mb-2">
                    La historia detrás de tu receta (opcional)
                  </label>
                  <textarea
                    value={formData.story}
                    onChange={(e) => updateField('story', e.target.value)}
                    placeholder="¿Por qué esta receta es especial para ti?"
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-justo-dark/10 rounded-xl font-sans text-justo-dark placeholder:text-justo-dark/30 focus:outline-none focus:ring-2 focus:ring-justo-brown/50 resize-none"
                  />
                </div>

                <div className="bg-justo-brown/5 rounded-xl p-4 text-center">
                  <p className="text-sm font-sans text-justo-dark/70">
                    Al enviar, aceptas que tu receta puede ser seleccionada y publicada 
                    en nuestra sección de métodos con crédito a tu nombre.
                  </p>
                </div>
              </div>

              {submitError && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle size={18} />
                  <span className="text-sm font-sans">{submitError}</span>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setCurrentStep('steps')} className="flex-1">
                  Atrás
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleSubmit} 
                  className="flex-1"
                  disabled={!canProceed() || isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Receta'}
                </Button>
              </div>
            </div>
          )}

          {/* SUCCESS STEP */}
          {currentStep === 'success' && (
            <div className="text-center space-y-8 py-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <Check className="w-12 h-12 text-green-600" />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-heading text-5xl text-justo-dark">
                  ¡Gracias!
                </h3>
                <p className="font-sans text-justo-dark/70 text-lg max-w-md mx-auto leading-relaxed">
                  Hemos recibido tu receta. Nuestro equipo la revisará y si es seleccionada, 
                  la publicaremos el próximo viernes con tu nombre.
                </p>
              </div>

              <div className="bg-white/50 rounded-2xl p-6 max-w-sm mx-auto">
                <p className="font-body font-bold text-justo-brown uppercase tracking-wider text-sm mb-2">
                  Próxima actualización
                </p>
                <p className="font-heading text-3xl text-justo-dark">
                  Viernes de recetas
                </p>
              </div>

              <Button 
                variant="primary" 
                onClick={onClose}
                className="mx-auto"
              >
                Cerrar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
