const DiskStorage = require('../../providers/DiskStorage');
const AppError = require('../../utils/AppError');

class IngredientCreateService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  async execute(name, imagePath) {
    const diskStorage = new DiskStorage();

    if (!name) {
      throw new AppErrorr(
        'Você deixou um campo vazio. Preencha todos os campos necessário para cadastrar um novo ingrediente!'
      );
    }

    const checkIngredientExists = await this.ingredientsRepository.findByName(
      name
    );

    if (checkIngredientExists) {
      await diskStorage.deleteTmpFile(imagePath);

      throw new AppError(
        'Este ingrediente já existe. Escolha outro nome para o ingrediente que deseja cadastrar.'
      );
    }

    const filename = await diskStorage.saveFile(imagePath);

    const ingredient_id = await this.ingredientsRepository.create({
      name,
      imagePath: filename,
    });

    return {
      id: Number(ingredient_id),
      name,
      imagePath,
    };
  }
}

module.exports = IngredientCreateService;
