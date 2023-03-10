const AppError = require('../../utils/AppError');

class CategoryDeleteService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(id) {
    if (!id) {
      throw new AppError('A categoria na qual deseja deletar não existe.');
    }
    await this.categoriesRepository.delete(id);
  }
}

module.exports = CategoryDeleteService;
