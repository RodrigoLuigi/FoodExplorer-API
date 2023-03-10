const AppError = require('../../utils/AppError');

class CategoryCreateService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({ name, icon }) {
    if (!name || !icon) {
      throw new AppError(
        'Você deixou um campo vazio. Preencha todos os campos necessário para cadastrar uma nova categoria!'
      );
    }

    const checkCategoryExists = await this.categoriesRepository.findByName(
      name
    );

    if (checkCategoryExists) {
      throw new AppError(
        'Esta categoria já existe. Escolha outro nome para a categoria que deseja cadastrar.'
      );
    }

    const category_id = await this.categoriesRepository.create({ name, icon });

    return {
      id: Number(category_id),
      name,
      icon,
    };
  }
}

module.exports = CategoryCreateService;
