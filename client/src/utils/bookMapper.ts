import { AladinBook, Book, BookMapper } from '@/types/book';

/**
 * 알라딘 API 응답을 Book 타입으로 변환하는 Mapper 클래스
 * DTO 패턴을 사용하여 API 응답과 도메인 모델을 분리
 */
export class AladinBookMapper implements BookMapper {
  /**
   * 단일 AladinBook을 Book으로 변환
   */
  toBook(aladinBook: AladinBook): Book {
    return {
      title: aladinBook.title || '',
      authors: this.parseAuthors(aladinBook.author),
      translators: aladinBook.author
        ? this.parseAuthors(aladinBook.author)
        : undefined,
      publisher: aladinBook.publisher || '',
      contents: aladinBook.description || '',
      datetime: aladinBook.pubDate || '',
      isbn: aladinBook.isbn || '',
      price: aladinBook.priceStandard || 0,
      sale_price: aladinBook.priceSales || 0,
      status: this.mapAvailabilityToStatus(aladinBook.stockStatus),
      thumbnail: aladinBook.cover || '',
      url: aladinBook.link || '',
    };
  }

  /**
   * AladinBook 배열을 Book 배열로 변환
   */
  toBookList(aladinBooks: AladinBook[]): Book[] {
    return aladinBooks.map((book) => this.toBook(book));
  }

  /**
   * 저자 문자열을 배열로 파싱 (여러 저자가 쉼표로 구분된 경우)
   */
  private parseAuthors(authorString: string): string[] {
    if (!authorString) return [];
    return authorString
      .split(',')
      .map((author) => author.trim())
      .filter((author) => author.length > 0);
  }

  /**
   * 알라딘 API의 availability를 Book status로 매핑
   */
  private mapAvailabilityToStatus(availability: string): string {
    if (!availability) return 'unknown';

    const availabilityLower = availability.toLowerCase();

    if (
      availabilityLower.includes('재고있음') ||
      availabilityLower.includes('available')
    ) {
      return 'available';
    } else if (
      availabilityLower.includes('재고없음') ||
      availabilityLower.includes('unavailable')
    ) {
      return 'unavailable';
    } else if (
      availabilityLower.includes('예약') ||
      availabilityLower.includes('reserved')
    ) {
      return 'reserved';
    }

    return 'unknown';
  }
}

// 싱글톤 인스턴스 export
export const aladinBookMapper = new AladinBookMapper();
