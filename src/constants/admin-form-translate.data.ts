export const FORM_BLOG_CATEGORIES_TRANSLATE = {
    PROJECTS: {
        ro: 'Proiecte',
        en: 'Projects',
        ru: 'Проекты'
    },
    LOCAL_PRODUCTS: {
        ro: 'Produse Locale',
        en: 'Local Products',
        ru: 'Местные Продукты'
    },
    SERVICES: {
        ro: 'Servicii',
        en: 'Services',
        ru: 'Услуги'
    },
    TOURIST_ATTRACTIONS: {
        ro: 'Atracții Turistice',
        en: 'Tourist Attractions',
        ru: 'Достопримечательности'
    },
    PEOPLE_AND_VALUES: {
        ro: 'Oameni și Valori',
        en: 'People and Values',
        ru: 'Люди и Ценности'
    },
    CALLS: {
        ro: 'Apeluri',
        en: 'Calls',
        ru: 'Объявления'
    },
    EVENTS: {
        ro: 'Evenimente',
        en: 'Events',
        ru: 'События'
    },
    AGRICULTURE: {
        ro: 'Agricultură',
        en: 'Agriculture',
        ru: 'Сельское хозяйство'
    },
    TOURISM: {
        ro: 'Turism',
        en: 'Tourism',
        ru: 'Туризм'
    },
    ENTREPRENEURSHIP: {
        ro: 'Antreprenoriat',
        en: 'Entrepreneurship',
        ru: 'Предпринимательство'
    },
    YOUTH: {
        ro: 'Tineret',
        en: 'Youth',
        ru: 'Молодёжь'
    },
    CULTURE: {
        ro: 'Cultură',
        en: 'Culture',
        ru: 'Культура'
    },
    PUBLIC: {
        ro: 'Public',
        en: 'Public',
        ru: 'Публичный'
    },
    ECOLOGY: {
        ro: 'Ecologie',
        en: 'Ecology',
        ru: 'Экология'
    },
    PARTNERSHIPS: {
        ro: 'Parteneriate',
        en: 'Partnerships',
        ru: 'Партнёрство'
    }
} as const

export const FORM_CONTENT_TYPE_TRANSLATE = {
	NEWS: {
		ro: 'Noutate',
		en: 'News',
		ru: 'Новости'
	},
	PROJECT: {
		ro: 'Proiect',
		en: 'Project',
		ru: 'Проект'
	},
	AUTHENTIC_LOCAL: {
		ro: 'Autentic Local',
		ru: 'Аутентичный локальный',
		en: 'Authentic Local'
	}
}

export const FORM_AUTHENTIC_LOCAL_CATEGORIES_TRANSLATE = {
	LOCAL_PRODUCTS: {
		ro: 'Produse Locale',
		ru: 'Местные Продукты',
		en: 'Local Products'
	},
	SERVICES: {
		ro: 'Servicii din Comunitate',
		ru: 'Услуги сообщества',
		en: 'Community Services'
	},
	TOURIST_ATTRACTIONS: {
		ro: 'Atracții Turistice',
		ru: 'Достопримечательности',
		en: 'Tourist Attractions'
	},
	PEOPLE_AND_VALUES: {
		ro: 'Oameni și Valori',
		ru: 'Люди и Ценности',
		en: 'People and Values'
	}
}

export const ADMIN_FORM_TRANSLATE = {
	titleInput: {
		ro: {
			label: 'Titlu articol',
			placeholder: 'Introduceți titlul articolului',
			error: 'Titlul este obligatoriu în toate limbile'
		},
		en: {
			label: 'Article title',
			placeholder: 'Enter the article title',
			error: 'The article title is required in all languages'
		},
		ru: {
			label: 'Название статьи',
			placeholder: 'Введите название статьи',
			error: 'Название статьи должно быть заполнено на всех языках'
		}
	},
	contentTypeInput: {
		ro: {
			label: 'Pagina articolului',
			placeholder: 'Selectați pagina articolului',
			error: 'Pagina articolului este obligatorie'
		},
		en: {
			label: 'Article page',
			placeholder: 'Select article page',
			error: 'Article page is required'
		},
		ru: {
			label: 'Страница статьи',
			placeholder: 'Выберите страницу статьи',
			error: 'Страница статьи обязательна'
		}
	},
	authenticLocalCategoryInput: {
		ro: {
			label: 'Subpagină Autentic Local',
			placeholder: 'Selectați subpagina',
			error: 'Subpagina este obligatorie'
		},
		en: {
			label: 'Authentic Local subpage',
			placeholder: 'Select subpage',
			error: 'Authentic Local subpage is required'
		},
		ru: {
			label: 'Подстраница Аутентичного Локального',
			placeholder: 'Выберите подстраницу',
			error: 'Подстраница Аутентичного Локального обязательна'
		}
	},
	categoriesInput: {
		ro: {
			label: 'Categoriile articolului',
			placeholder: 'Selectați cel puțin o categorie',
			error: 'Cel puțin o categorie este obligatorie'
		},
		en: {
			label: 'Article categories',
			placeholder: 'Select at least one category',
			error: 'At least one category is required'
		},
		ru: {
			label: 'Категории статьи',
			placeholder: 'Выберите хотя бы одну категорию',
			error: 'Необходима хотя бы одна категория'
		}
	},
	mainImageInput: {
		ro: {
			label: 'Imaginea principală',
			placeholder: {
				main: 'Faceți clic pentru a încărca imaginea',
				subtext: 'Dimensiune maximă'
			},
			error: 'Imaginea principală este obligatorie'
		},
		en: {
			label: 'Main image',
			placeholder: {
				main: 'Click to upload main image',
				subtext: 'Max size'
			},
			error: 'Main image is required'
		},
		ru: {
			label: 'Основное изображение',
			placeholder: {
				main: 'Нажмите, чтобы загрузить основное изображение',
				subtext: 'Макс. размер'
			},
			error: 'Основное изображение обязательно'
		}
	},
	summaryInput: {
		ro: {
			label: {
				title: 'Sumarul articolului',
				col1_title: 'Text coloana #1 sumar',
				col2_title: 'Text coloana #2 sumar'
			},
			placeholder: {
				col1_placeholder: 'Text coloana #1',
				col2_placeholder: 'Text coloana #2'
			},
			error: {
				col1_error: 'Sumarul trebuie completat în toate limbile',
				col2_error: 'Coloana #2 trebuie completată în toate limbile dacă este utilizată'
			}
		},
		en: {
			label: {
				title: 'Article summary',
				col1_title: 'Column #1 summary text',
				col2_title: 'Column #2 summary text'
			},
			placeholder: {
				col1_placeholder: 'Column #1 text',
				col2_placeholder: 'Column #2 text'
			},
			error: {
				col1_error: 'Summary must be filled in all languages',
				col2_error: 'Column #2 must be filled in all languages if used'
			}
		},
		ru: {
			label: {
				title: 'Резюме статьи',
				col1_title: 'Текст столбца #1 резюме',
				col2_title: 'Текст столбца #2 резюме'
			},
			placeholder: {
				col1_placeholder: 'Текст столбца #1',
				col2_placeholder: 'Текст столбца #2'
			},
			error: {
				col1_error: 'Резюме должно быть заполнено на всех языках',
				col2_error: 'Столбец #2 должен быть заполнен на всех языках, если используется'
			}
		}
	},
	paragraphInput: {
		ro: {
			label: 'Titlu paragraf',
			placeholder: 'Introduceți titlul paragrafului',
			error: 'Titlul este obligatoriu în toate limbile'
		},
		en: {
			label: 'Paragraph title',
			placeholder: 'Enter the paragraph title',
			error: 'The paragraph title is required in all languages'
		},
		ru: {
			label: 'Заголовок абзаца',
			placeholder: 'Введите заголовок абзаца',
			error: 'Заголовок абзаца должен быть заполнен на всех языках'
		}
	},
	subparagraphInput: {
		ro: {
			label: {
				title: 'Titlu subparagraf',
				col1_title: 'Text coloana #1 subparagraf',
				col2_title: 'Text coloana #2 subparagraf'
			},
			placeholder: {
				title: 'Introduceți titlul subparagrafului',
				col1_placeholder: 'Text coloana #1',
				col2_placeholder: 'Text coloana #2'
			},
			error: {
				title: 'Titlul este obligatoriu în toate limbile',
				col1_error: 'Coloana #1 trebuie completată în toate limbile',
				col2_error: 'Coloana #2 trebuie completată în toate limbile dacă este utilizată'
			}
		},
		en: {
			label: {
				title: 'Subparagraph title',
				col1_title: 'Column #1 subparagraph text',
				col2_title: 'Column #2 subparagraph text'
			},
			placeholder: {
				title: 'Enter the subparagraph title',
				col1_placeholder: 'Column #1 text',
				col2_placeholder: 'Column #2 text'
			},
			error: {
				title: 'Title is required in all languages',
				col1_error: 'Column #1 must be filled in all languages',
				col2_error: 'Column #2 must be filled in all languages if used'
			}
		},
		ru: {
			label: {
				title: 'Заголовок подпараграфа',
				col1_title: 'Текст столбца #1 подпараграфа',
				col2_title: 'Текст столбца #2 подпараграфа'
			},
			placeholder: {
				title: 'Введите заголовок подпараграфа',
				col1_placeholder: 'Текст столбца #1',
				col2_placeholder: 'Текст столбца #2'
			},
			error: {
				title: 'Заголовок обязателен для всех языков',
				col1_error: 'Столбец #1 должен быть заполнен на всех языках',
				col2_error: 'Столбец #2 должен быть заполнен на всех языках, если используется'
			}
		}
	},
	addingElements: {
		ro: {
			addParagraph: 'Adaugă paragraf',
			addSubparagraph: 'Adaugă subparagraf',
			addSingleImage: 'Adaugă imagine "una orizontală"',
			addDoubleImage: 'Adaugă imagine "două pătrate"',
			remove: 'Elimină',
			removeImage: "Eliminați câmpul de imagine dacă nu aveți nevoie să încărcați o imagine"
		},
		en: {
			addParagraph: 'Add paragraph',
			addSubparagraph: 'Add subparagraph',
			addSingleImage: 'Add image "one horizontal"',
			addDoubleImage: 'Add image "two squares"',
			remove: 'Remove',
			removeImage: "Remove the image field if you don't need to upload an image"
		},
		ru: {
			addParagraph: 'Добавить абзац',
			addSubparagraph: 'Добавить подпараграф',
			addSingleImage: 'Добавить изображение "один горизонтальный"',
			addDoubleImage: 'Добавить изображение "два квадратных"',
			remove: 'Удалить',
			removeImage: 'Удалите поле изображения, если вам не нужно загружать изображение'
		}
	}
} as const
