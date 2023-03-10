const AppError = require('../../utils/AppError');

class CategoryDeleteService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(id) {
    await this.categoriesRepository.delete(id);
  }
}

module.exports = CategoryDeleteService;
