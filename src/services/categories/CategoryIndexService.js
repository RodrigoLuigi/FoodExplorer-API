const AppError = require('../../utils/AppError');

class CategoryIndexService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute() {
    const categories = await this.categoriesRepository.index();

    if (!categories) {
      throw new AppError('Não existem categorias cadastradas.');
    }

    return categories;
  }
}

module.exports = CategoryIndexService;
