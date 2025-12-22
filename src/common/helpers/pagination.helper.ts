import { Model, FilterQuery } from 'mongoose';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginationResponse } from '../interfaces/pagination-response.interface';

export class PaginationHelper {
  /**
   * Generic pagination helper for Mongoose models
   * @param model - Mongoose model
   * @param paginationDto - Pagination parameters
   * @param filter - Optional filter query
   * @param sort - Optional sort object (default: { createdAt: -1 })
   * @param populatePath - Optional path to populate
   * @param populateSelect - Optional fields to select from populated document
   * @returns Paginated response with data and pagination metadata
   */
  static async paginate<T>(
    model: Model<T>,
    paginationDto: PaginationDto,
    filter: FilterQuery<T> = {},
    sort: Record<string, 1 | -1> = { createdAt: -1 },
    populatePath?: string,
    populateSelect?: string,
  ): Promise<PaginationResponse<T>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    let query = model.find(filter).sort(sort).skip(skip).limit(limit);

    if (populatePath) {
      query = query.populate(populatePath, populateSelect);
    }

    const [data, total] = await Promise.all([
      query.exec(),
      model.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      data,
    };
  }

  /**
   * Calculate pagination metadata only
   */
  static calculateMetadata(total: number, page: number, limit: number) {
    const totalPages = Math.ceil(total / limit);
    return {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }
}
