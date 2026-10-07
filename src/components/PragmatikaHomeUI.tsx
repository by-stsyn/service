import React from 'react';
import {
  Wrench,
  Car,
  Calendar,
  Gift,
  User,
  Phone,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  Percent,
  QrCode,
  X,
  CheckCircle2,
  ChevronRight,
  SlidersHorizontal,
  Navigation,
  HelpCircle,
  FileText
} from 'lucide-react';

/* ==========================================================================
   TYPES & PROPS (PRESENTATIONAL CONTRACT)
   ========================================================================== */

export interface StoryItem {
  id: string;
  title: string;
  imageUrl?: string;
  isUnread?: boolean;
}

export interface BonusCardData {
  cardNumber: string;
  bonusBalance: number;
  cashbackTier: string;
  cashbackPercent: number;
  userName?: string;
}

export interface PromoOfferItem {
  id: string;
  title: string;
  badge?: string;
  description: string;
  price?: string;
  oldPrice?: string;
  imageUrl?: string;
}

export interface ServiceCategoryChip {
  id: string;
  label: string;
  count?: number;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  title: string;
  duration?: string;
  price: string;
  oldPrice?: string;
  popular?: boolean;
  description?: string;
}

export interface BottomTabItem {
  id: string;
  label: string;
  iconName: 'home' | 'services' | 'cars' | 'promos' | 'profile';
  badgeCount?: number;
}

export interface PragmatikaHomeUIProps {
  // City & Header
  currentCity: string;
  citiesList: string[];
  phoneNumber: string;
  onCityChange?: (city: string) => void;
  onCallSupport?: () => void;
  onOpenNotifications?: () => void;

  // Stories
  stories?: StoryItem[];
  onSelectStory?: (storyId: string) => void;

  // Bonus Card
  bonusData?: BonusCardData;
  onShowBonusQR?: () => void;
  onOpenBonusDetails?: () => void;

  // Quick Action navigation
  onOpenOnlineBooking?: () => void;
  onOpenCarsCatalog?: () => void;
  onOpenPromotions?: () => void;
  onOpenServiceCalc?: () => void;

  // Offers Slider
  promoOffers?: PromoOfferItem[];
  onSelectPromoOffer?: (offer: PromoOfferItem) => void;

  // Services Catalog & Filters
  categories?: ServiceCategoryChip[];
  selectedCategoryId?: string;
  onSelectCategory?: (categoryId: string) => void;
  services?: ServiceItem[];
  onBookService?: (service: ServiceItem) => void;
  onServiceInfo?: (service: ServiceItem) => void;

  // Navigation
  tabs?: BottomTabItem[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;

  // Active Bottom Sheet (if any)
  isBottomSheetOpen?: boolean;
  bottomSheetTitle?: string;
  onCloseBottomSheet?: () => void;
  bottomSheetContent?: React.ReactNode;
}

/* ==========================================================================
   ISOLATED DUMB COMPONENTS
   ========================================================================== */

/**
 * 1. Top Header Bar (City selector, Phone, Brand identity)
 */
export const MiniAppHeaderUI: React.FC<{
  currentCity: string;
  phoneNumber: string;
  onCityClick?: () => void;
  onCallClick?: () => void;
}> = ({ currentCity, phoneNumber, onCityClick, onCallClick }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-pragmatika-dark flex items-center justify-center text-pragmatika-green shadow-sm">
          <Wrench className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm tracking-tight text-pragmatika-dark">ПРАГМАТИКА</span>
            <span className="text-[10px] uppercase font-semibold text-pragmatika-green bg-pragmatika-green/10 px-1.5 py-0.5 rounded-md">
              Сервис
            </span>
          </div>
          <button
            type="button"
            onClick={onCityClick}
            className="flex items-center gap-1 text-xs text-pragmatika-light hover:text-pragmatika-dark transition-colors"
          >
            <span>{currentCity}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
          onClick={(e) => {
            if (onCallClick) {
              e.preventDefault();
              onCallClick();
            }
          }}
          className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-pragmatika-dark px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
          aria-label="Позвонить в сервис"
        >
          <Phone className="w-3.5 h-3.5 text-pragmatika-green" />
          <span>Позвонить</span>
        </a>
      </div>
    </header>
  );
};

/**
 * 2. Highlights / Stories Carousel
 */
export const StoriesCarouselUI: React.FC<{
  stories: StoryItem[];
  onSelectStory?: (id: string) => void;
}> = ({ stories, onSelectStory }) => {
  if (!stories.length) return null;

  return (
    <section className="py-3 px-4 overflow-x-auto hide-scrollbar flex items-center gap-3">
      {stories.map((story) => (
        <button
          key={story.id}
          type="button"
          onClick={() => onSelectStory?.(story.id)}
          className="flex flex-col items-center flex-shrink-0 focus:outline-none group"
        >
          <div
            className={`w-16 h-16 rounded-2xl p-0.5 flex items-center justify-center transition-transform group-active:scale-95 ${
              story.isUnread
                ? 'bg-gradient-to-tr from-pragmatika-green via-pragmatika-light to-pragmatika-green'
                : 'bg-slate-200'
            }`}
          >
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden p-1">
              {story.imageUrl ? (
                <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-pragmatika-dark font-bold text-xs">
                  <Sparkles className="w-5 h-5 text-pragmatika-green" />
                </div>
              )}
            </div>
          </div>
          <span className="text-[11px] text-pragmatika-dark font-medium mt-1.5 max-w-[68px] truncate text-center">
            {story.title}
          </span>
        </button>
      ))}
    </section>
  );
};

/**
 * 3. Virtual Bonus / Loyalty Card Widget
 */
export const BonusCardUI: React.FC<{
  bonusData: BonusCardData;
  onShowQR?: () => void;
  onDetailsClick?: () => void;
}> = ({ bonusData, onShowQR, onDetailsClick }) => {
  return (
    <div className="mx-4 mb-4 relative overflow-hidden rounded-2xl bg-gradient-to-br from-pragmatika-dark to-[#2c3b46] text-white p-5 shadow-sm shadow-black/5">
      <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-pragmatika-green/15 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <span className="text-[11px] font-medium tracking-wide text-pragmatika-light uppercase">
            Бонусная карта «Прагматика»
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold tracking-tight text-white">
              {bonusData.bonusBalance.toLocaleString('ru-RU')}
            </span>
            <span className="text-sm font-semibold text-pragmatika-green">баллов</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onShowQR}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-2.5 rounded-xl text-white transition-colors flex items-center justify-center"
          title="Показать QR-код карты"
        >
          <QrCode className="w-5 h-5 text-pragmatika-green" />
        </button>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between relative z-10 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="bg-pragmatika-green/20 text-pragmatika-green font-semibold px-2 py-0.5 rounded-md text-[11px]">
            {bonusData.cashbackPercent}% кэшбэк
          </span>
          <span>{bonusData.cashbackTier}</span>
        </div>

        <button
          type="button"
          onClick={onDetailsClick}
          className="flex items-center gap-1 text-slate-200 hover:text-white font-medium"
        >
          <span>Списать бонусы</span>
          <ChevronRight className="w-3.5 h-3.5 text-pragmatika-green" />
        </button>
      </div>
    </div>
  );
};

/**
 * 4. Quick Action Grid (Large Mobile Touch Targets)
 */
export const QuickNavGridUI: React.FC<{
  onBookingClick?: () => void;
  onCarsClick?: () => void;
  onPromosClick?: () => void;
  onCalcClick?: () => void;
}> = ({ onBookingClick, onCarsClick, onPromosClick, onCalcClick }) => {
  return (
    <section className="px-4 mb-5">
      <div className="grid grid-cols-2 gap-3">
        {/* Main CTA: Quick Service Booking */}
        <button
          type="button"
          onClick={onBookingClick}
          className="col-span-2 bg-pragmatika-green hover:brightness-105 active:scale-[0.99] text-white p-4 rounded-2xl shadow-sm flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Запись на сервис</h3>
              <p className="text-xs text-white/90 mt-0.5">Выбор мастера, даты и точного времени</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-white flex-shrink-0" />
        </button>

        {/* Action 2: Car Catalogue */}
        <button
          type="button"
          onClick={onCarsClick}
          className="bg-white hover:bg-slate-50 active:scale-[0.98] text-left p-3.5 rounded-2xl shadow-sm border border-slate-100/80 transition-all flex flex-col justify-between h-28"
        >
          <div className="w-9 h-9 rounded-xl bg-pragmatika-dark/5 flex items-center justify-center text-pragmatika-dark">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm text-pragmatika-dark block leading-tight">Новые и авто с пробегом</span>
            <span className="text-[11px] text-pragmatika-light">Каталог в наличии</span>
          </div>
        </button>

        {/* Action 3: Offers & Promos */}
        <button
          type="button"
          onClick={onPromosClick}
          className="bg-white hover:bg-slate-50 active:scale-[0.98] text-left p-3.5 rounded-2xl shadow-sm border border-slate-100/80 transition-all flex flex-col justify-between h-28"
        >
          <div className="w-9 h-9 rounded-xl bg-pragmatika-green/10 flex items-center justify-center text-pragmatika-green">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm text-pragmatika-dark block leading-tight">Акции и скидки</span>
            <span className="text-[11px] text-pragmatika-light">Специальные выгоды</span>
          </div>
        </button>
      </div>
    </section>
  );
};

/**
 * 5. Horizontal Promo Offers Slider
 */
export const PromoOffersSliderUI: React.FC<{
  offers: PromoOfferItem[];
  onSelectOffer?: (offer: PromoOfferItem) => void;
  onViewAll?: () => void;
}> = ({ offers, onSelectOffer, onViewAll }) => {
  if (!offers.length) return null;

  return (
    <section className="mb-6">
      <div className="px-4 mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-pragmatika-dark">Спецпредложения сервиса</h2>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-pragmatika-green hover:underline"
          >
            Все акции
          </button>
        )}
      </div>

      <div className="px-4 flex gap-3.5 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
        {offers.map((offer) => (
          <div
            key={offer.id}
            onClick={() => onSelectOffer?.(offer)}
            className="w-[280px] flex-shrink-0 snap-start bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80 cursor-pointer active:scale-[0.99] transition-transform flex flex-col justify-between"
          >
            <div>
              {offer.badge && (
                <span className="inline-block bg-pragmatika-green/15 text-pragmatika-dark text-[11px] font-bold px-2.5 py-1 rounded-lg mb-2">
                  {offer.badge}
                </span>
              )}
              <h3 className="font-bold text-sm text-pragmatika-dark line-clamp-2 leading-snug">
                {offer.title}
              </h3>
              <p className="text-xs text-pragmatika-light mt-1.5 line-clamp-2">
                {offer.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                {offer.oldPrice && (
                  <span className="text-[11px] text-pragmatika-light line-through block leading-none">
                    {offer.oldPrice}
                  </span>
                )}
                <span className="text-base font-extrabold text-pragmatika-dark leading-tight">
                  {offer.price || 'Бесплатно'}
                </span>
              </div>

              <button
                type="button"
                className="bg-pragmatika-green text-white text-xs font-bold px-3 py-2 rounded-xl hover:brightness-105 transition-all shadow-sm"
              >
                Записаться
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * 6. Category Filter Chips (Strictly Styled per Design System)
 */
export const FilterChipsUI: React.FC<{
  categories: ServiceCategoryChip[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}> = ({ categories, selectedCategoryId, onSelectCategory }) => {
  return (
    <div className="px-4 mb-4 flex items-center gap-2 overflow-x-auto hide-scrollbar">
      {categories.map((cat) => {
        const isActive = cat.id === selectedCategoryId;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`flex-shrink-0 text-xs font-medium rounded-full px-4 py-2 transition-all ${
              isActive
                ? 'bg-pragmatika-dark text-white border border-pragmatika-dark shadow-sm'
                : 'bg-white border border-pragmatika-light text-pragmatika-dark hover:border-pragmatika-dark'
            }`}
          >
            <span>{cat.label}</span>
            {typeof cat.count === 'number' && (
              <span className={`ml-1.5 text-[10px] ${isActive ? 'text-pragmatika-green' : 'text-pragmatika-light'}`}>
                {cat.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

/**
 * 7. Services List Cards
 */
export const ServicesListUI: React.FC<{
  services: ServiceItem[];
  onBookService?: (service: ServiceItem) => void;
  onServiceInfo?: (service: ServiceItem) => void;
}> = ({ services, onBookService, onServiceInfo }) => {
  if (!services.length) {
    return (
      <div className="px-4 py-8 text-center bg-white mx-4 rounded-2xl shadow-sm text-pragmatika-light text-xs">
        Услуги в данной категории не найдены
      </div>
    );
  }

  return (
    <section className="px-4 space-y-2.5 mb-8">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80 flex items-center justify-between gap-3"
        >
          <div className="flex-1 min-w-0" onClick={() => onServiceInfo?.(service)}>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-pragmatika-dark truncate">
                {service.title}
              </h4>
              {service.popular && (
                <span className="text-[10px] bg-pragmatika-green/15 text-pragmatika-dark font-bold px-1.5 py-0.5 rounded">
                  Топ
                </span>
              )}
            </div>

            {service.duration && (
              <div className="flex items-center gap-1 text-[11px] text-pragmatika-light mt-0.5">
                <Clock className="w-3 h-3" />
                <span>~ {service.duration}</span>
              </div>
            )}

            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-extrabold text-sm text-pragmatika-dark">
                {service.price}
              </span>
              {service.oldPrice && (
                <span className="text-xs text-pragmatika-light line-through">
                  {service.oldPrice}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onBookService?.(service)}
            className="flex-shrink-0 bg-pragmatika-green hover:brightness-105 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            Записаться
          </button>
        </div>
      ))}
    </section>
  );
};

/**
 * 8. Bottom Sheet Pattern (Native Mobile Modal)
 */
export const BottomSheetUI: React.FC<{
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Sheet Sheet Drawer */}
      <div className="relative z-10 w-full bg-white rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up">
        {/* Drag / Pull Handle */}
        <div className="pt-3 pb-1 flex justify-center cursor-grab" onClick={onClose}>
          <div className="w-12 h-1.5 rounded-full bg-slate-200" />
        </div>

        {/* Sheet Header */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-base text-pragmatika-dark">
            {title || 'Информация'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-pragmatika-dark hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sheet Body Scrollable Content */}
        <div className="p-5 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * 9. Bottom Navigation Tab Bar (iOS / Android Native Dock)
 */
export const BottomTabBarUI: React.FC<{
  tabs: BottomTabItem[];
  activeTabId: string;
  onTabChange: (id: string) => void;
}> = ({ tabs, activeTabId, onTabChange }) => {
  const getIcon = (iconName: BottomTabItem['iconName'], isActive: boolean) => {
    const className = `w-5 h-5 transition-colors ${
      isActive ? 'text-pragmatika-green stroke-[2.2]' : 'text-pragmatika-light stroke-[1.8]'
    }`;

    switch (iconName) {
      case 'home':
        return <Wrench className={className} />;
      case 'services':
        return <SlidersHorizontal className={className} />;
      case 'cars':
        return <Car className={className} />;
      case 'promos':
        return <Percent className={className} />;
      case 'profile':
        return <User className={className} />;
      default:
        return <Wrench className={className} />;
    }
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-100 px-2 py-2 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className="flex-1 flex flex-col items-center justify-center py-1 relative focus:outline-none"
            >
              <div className="relative">
                {getIcon(tab.iconName, isActive)}
                {typeof tab.badgeCount === 'number' && tab.badgeCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-pragmatika-green text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                    {tab.badgeCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] mt-1 font-medium leading-none ${
                  isActive ? 'text-pragmatika-green font-semibold' : 'text-pragmatika-light'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

/* ==========================================================================
   COMPLETE PRESENTATIONAL PAGE LAYOUT (PRAGMATIKA MINI APP)
   ========================================================================== */

const DEFAULT_TABS: BottomTabItem[] = [
  { id: 'home', label: 'Главная', iconName: 'home' },
  { id: 'services', label: 'Услуги', iconName: 'services' },
  { id: 'cars', label: 'Авто', iconName: 'cars' },
  { id: 'promos', label: 'Акции', iconName: 'promos' },
  { id: 'profile', label: 'Профиль', iconName: 'profile' },
];

export const PragmatikaHomeUI: React.FC<PragmatikaHomeUIProps> = ({
  currentCity = 'Санкт-Петербург',
  phoneNumber = '+7 (812) 448-68-68',
  onCityChange,
  onCallSupport,
  stories = [],
  onSelectStory,
  bonusData,
  onShowBonusQR,
  onOpenBonusDetails,
  onOpenOnlineBooking,
  onOpenCarsCatalog,
  onOpenPromotions,
  onOpenServiceCalc,
  promoOffers = [],
  onSelectPromoOffer,
  categories = [],
  selectedCategoryId = 'all',
  onSelectCategory = () => {},
  services = [],
  onBookService,
  onServiceInfo,
  tabs = DEFAULT_TABS,
  activeTabId = 'home',
  onTabChange = () => {},
  isBottomSheetOpen = false,
  bottomSheetTitle,
  onCloseBottomSheet = () => {},
  bottomSheetContent,
}) => {
  return (
    <div className="bg-slate-50 min-h-screen text-pragmatika-black font-sans pb-24 antialiased selection:bg-pragmatika-green/20">
      {/* Mobile Shell Constraint */}
      <div className="max-w-md mx-auto relative min-h-screen">
        {/* 1. Header */}
        <MiniAppHeaderUI
          currentCity={currentCity}
          phoneNumber={phoneNumber}
          onCallClick={onCallSupport}
          onCityClick={() => {
            // Optional callback or handled via bottom sheet
          }}
        />

        {/* 2. Stories */}
        {stories.length > 0 && (
          <StoriesCarouselUI stories={stories} onSelectStory={onSelectStory} />
        )}

        {/* 3. Loyalty Bonus Card */}
        {bonusData && (
          <BonusCardUI
            bonusData={bonusData}
            onShowQR={onShowBonusQR}
            onDetailsClick={onOpenBonusDetails}
          />
        )}

        {/* 4. Quick Actions */}
        <QuickNavGridUI
          onBookingClick={onOpenOnlineBooking}
          onCarsClick={onOpenCarsCatalog}
          onPromosClick={onOpenPromotions}
          onCalcClick={onOpenServiceCalc}
        />

        {/* 5. Promo Offers Slider */}
        {promoOffers.length > 0 && (
          <PromoOffersSliderUI
            offers={promoOffers}
            onSelectOffer={onSelectPromoOffer}
            onViewAll={onOpenPromotions}
          />
        )}

        {/* 6. Filter Chips */}
        {categories.length > 0 && (
          <FilterChipsUI
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={onSelectCategory}
          />
        )}

        {/* 7. Services List */}
        <ServicesListUI
          services={services}
          onBookService={onBookService}
          onServiceInfo={onServiceInfo}
        />

        {/* 8. Bottom Navigation Dock */}
        <BottomTabBarUI
          tabs={tabs}
          activeTabId={activeTabId}
          onTabChange={onTabChange}
        />

        {/* 9. Bottom Sheet Drawer */}
        <BottomSheetUI
          isOpen={isBottomSheetOpen}
          title={bottomSheetTitle}
          onClose={onCloseBottomSheet}
        >
          {bottomSheetContent}
        </BottomSheetUI>
      </div>
    </div>
  );
};

export default PragmatikaHomeUI;
